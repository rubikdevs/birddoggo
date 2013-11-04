<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}
	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$this->redirect(Yii::app()->homeUrl.'?r=site/login');
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionContact()
	{
	
	}

	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login())
				$this->redirect(Yii::app()->homeUrl.'?r=advertiser/index');
		}
		// display the login form
		$this->render('login',array('model'=>$model));
	}

	public function actionGetAdvertiser($location=null,$keywords=null){
		// OPTIONS
		$delimiter = ' '; 			// Keywords delimiter 
		$refineByKeywords = 1;  	// Quantity of Keyword Matches to pass the filter
		$noKeywordsGiven = 1;		// If $keywords=null, will disable the filter
		$similarity = 85.0;			// Minimun similarity for matching

		// DECODE $location
		$zipcode=null;
		$city=null;
		$state=null;

		$location = json_decode($location);
		//var_dump($location->locality);die;

		if (isset($location->postal_code))
			$zipcode = $location->postal_code;
		if (isset($location->locality))
			$city = $location->locality;
		if (isset($location->administrative_area_level_1))
			$state = $location->administrative_area_level_1;

		// CODE
		$results = array();
		if (!$zipcode==null) // IF ZIPCODE, IGNORE ADDRESS
		{
			// LOAD ALL ADVERTISERS BY ZIP CODE
			$advZipCode = Advertiser::model()->findAll('zip_code='.$zipcode);
			
			foreach($advZipCode as $advertiser)
			{
				// LOAD ALL KEYWORDS RELATIONS FOR THIS ADVERTISER
				$advKeys = AdvertiserKeyword::model()->findAll('advertiser_id='.$advertiser->id);
				$match = 0;

				if (!$keywords==null)
				{
					$arrKWs = explode($delimiter, $keywords);
					foreach($advKeys as $natKeyword)
					{
						// LOAD THE KEYWORD AND COMPARE IT
						$keywordName = Keyword::model()->findAll('id='.$natKeyword->keyword_id);
						foreach($arrKWs as $kw)
						{
							$percent = 0;
							similar_text($keywordName[0]->name, $kw, $percent);
							if ( $percent > $similarity)
								$match++;
						}
					}
							
				} else
					// IF NO MATCHES, DISABLE FILTER
					$match = $noKeywordsGiven;
				// LOADS AND FORMATS IMAGE INTO ARRAY
				$allImages = array();
				foreach ($advertiser->images as $img)
					$allImages[] = Yii::app()->baseUrl.'/images/'.$advertiser->id.'-'.$img->image_uri;	
				// FILTER
				if ($match >= $refineByKeywords)
					$results[] = array(
						'name'=>$advertiser->name,
						'address'=>$advertiser->address,
						'city'=>$advertiser->city,
						'state'=>$advertiser->state,
						'zip_code'=>$advertiser->zip_code,
						'phone'=>$advertiser->phone,
						'website'=>$advertiser->website,
						'lat'=>$advertiser->lat,
						'lng'=>$advertiser->long,
						'description'=>$advertiser->description,
						'images'=>$allImages
						);
			}
		} elseif ((isset($city)) or (isset($state)))// IF ZIP CODE IS NULL, USE ADDRESS
		{

			// LOAD ALL ADVERTISERS BY CITY AND STATE
			$criteria = new CDbCriteria;
			if (isset($city))
				$criteria->condition = 'city="'.$city.'" AND state ="'.$state.'"';
			else
				$criteria->condition = 'state ="'.$state.'"';

			$advCity = Advertiser::model()->findAll($criteria);
			foreach($advCity as $advertiser)
			{
				// LOAD ALL KEYWORDS RELATIONS FOR THIS ADVERTISER
				$advKeys = AdvertiserKeyword::model()->findAll('advertiser_id='.$advertiser->id);
				$match = 0;

				if (isset($keywords))
				{
					$arrKWs = explode($delimiter, $keywords);
					foreach($advKeys as $natKeyword)
					{
						// LOAD THE KEYWORD AND COMPARE IT
						$keywordName = Keyword::model()->findAll('id='.$natKeyword->keyword_id);

						foreach($arrKWs as $kw)
						{
							$percent = 0;
							similar_text($keywordName[0]->name, $kw, $percent);
							if ( $percent > $similarity)
								$match++;
						}
					}
							
				} else
					// IF NO MATCHES, DISABLE FILTER
					$match = $noKeywordsGiven;
				// LOADS AND FORMATS IMAGE INTO ARRAY
				$allImages = array();
				foreach ($advertiser->images as $img)
					$allImages[] = Yii::app()->baseUrl.'/images/'.$advertiser->id.'-'.$img->image_uri;
				// FILTER
				if ($match >= $refineByKeywords)
					$results[] = array(
						'name'=>$advertiser->name,
						'address'=>$advertiser->address,
						'city'=>$advertiser->city,
						'state'=>$advertiser->state,
						'zip_code'=>$advertiser->zip_code,
						'phone'=>$advertiser->phone,
						'website'=>$advertiser->website,
						'lat'=>$advertiser->lat,
						'lng'=>$advertiser->long,
						'description'=>$advertiser->description,
						'images'=>$allImages
					);
			}


		}

		else
			$results = array();
		echo json_encode($results);
	}

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl);
	}
}