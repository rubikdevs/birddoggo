<?php

class AdvertiserController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
		//'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('index','view','test','ajix','create','update','admin','delete','upload','deleteImage'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}
	public function actionDeleteImage($id)
	{
		$image = Image::model()->findByPk($id);
		$image->delete();
		$w = unlink(getcwd().'/images/'.$image->owner->id.'-'.$image->image_uri);
		$this->redirect(array('view','id'=>$image->owner->id));
	}
	public function actionUpload($id){
		$model = new Image;
		$keyword = new Keyword;
		$advertiser = Advertiser::model()->findByPk($id);
		if (isset($_POST['Image']))
		{
			$model->advertiser_id = $id;
			$model->attributes = $_POST['Image'];
			$model->image_uri=CUploadedFile::getInstance($model,'image_uri');
			if($model->save())
            { 
                $model->image_uri->saveAs('images/'.$id.'-'.$model->image_uri);  // PATH IMAGES
                $this->redirect(array('view','id'=>$advertiser->id));
			}
		}
		$this->render('upload',array(
			'model'=>$model,
		));
	}

	public function actionAjix(){
		//var_dump('ss');die;
		$advertiser;
		if ((isset($_POST['advertiser_id'])) && isset($_POST['keyword_id']))
		{
			// DELETE RELATION
			$advertiser = $this->loadModel($_POST['advertiser_id']);
			$criteria = new CDbCriteria;
			$criteria->condition = 'advertiser_id ='.$_POST['advertiser_id'].' AND keyword_id ='.$_POST['keyword_id'];
			$assigment = AdvertiserKeyword::model()->findAll($criteria);
		//	var_dump($assigment);die;
			$assigment[0]->delete();

			// DELETE KEYWORD
			$keyword = Keyword::model()->findByPk($_POST['keyword_id']);
			$keyword->delete();
		}
		$this->renderPartial('_test', array('advertiser'=>$advertiser), false, true);
	}


	public function actionTest($id){
		$advertiser = $this->loadModel($id);
		if (isset($_POST['Keyword']))
		{
			$keyword = new Keyword;
			$relation = new AdvertiserKeyword;

			$keyword->attributes = $_POST['Keyword'];
			if (!$keyword->save())
				echo "<b>Name can't be empty!</b><br>"; //THROW EXCEPTION

			$relation->advertiser_id = $id;
			$relation->keyword_id = $keyword->primaryKey;

			if (!$relation->save())
				echo '<b>Try again.<br>'; //THROW EXCEPTION
		}

		$this->renderPartial('_test', array('advertiser'=>$advertiser), false, true);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{

		$this->render('view',array(
			'id'=>$id,
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Advertiser;

		$keyword=new Keyword;

		if(isset($_POST['Advertiser']))
		{
			$model->attributes=$_POST['Advertiser'];
			$address = str_replace(' ','+',$model->address.', '.$model->city.', '.$model->state);

			$jsonurl = "http://maps.googleapis.com/maps/api/geocode/json?address=".$address."&sensor=false";
			$json = file_get_contents($jsonurl,0,null,null);
			$json_output = json_decode($json);

			$model->lat = $json_output->results[0]->geometry->location->lat;
			$model->long = $json_output->results[0]->geometry->location->lng;

			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('create',array(
			'model'=>$model,
		));
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Advertiser']))
		{
			$model->attributes=$_POST['Advertiser'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		


		// DELETE RELATIONS
		$relations = AdvertiserKeyword::model()->findAll('advertiser_id='.$id);
		foreach($relations as $relation)
		{
			// DELETE KEYWORDS
			$keyword = Keyword::model()->findByPk($relation->keyword_id);
			$keyword->delete();
			// DELETE RELATIONS
			$relation->delete();
		}

		// DELETE MODEL
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Advertiser');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Advertiser('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Advertiser']))
			$model->attributes=$_GET['Advertiser'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Advertiser the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Advertiser::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param Advertiser $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='advertiser-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
