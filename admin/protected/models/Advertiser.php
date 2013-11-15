<?php

/**
 * This is the model class for table "tbl_advertiser".
 *
 * The followings are the available columns in table 'tbl_advertiser':
 * @property integer $id
 * @property string $name
 * @property string $address
 * @property string $city
 * @property string $state
 * @property integer $zip_code
 * @property string $phone
 * @property string $website
 * @property string $lat
 * @property string $long
 * @property string $description
 *
 * The followings are the available model relations:
 * @property Keyword[] $tblKeywords
 */
class Advertiser extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_advertiser';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('name, address, city, state, zip_code, phone, description, importance', 'required'),
			array('zip_code', 'numerical', 'integerOnly'=>true),
			array('name, address, city, state, phone, website, lat, long, facebook, twitter, mobile', 'length', 'max'=>255),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, name, address, city, state, zip_code, phone, website, lat, long, description, importance, facebook, twitter, mobile', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'keywords' => array(self::MANY_MANY, 'Keyword', 'tbl_advertiser_keyword(advertiser_id, keyword_id)'),
			'images' => array(self::HAS_MANY, 'Image', 'advertiser_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'name' => 'Name',
			'address' => 'Address',
			'city' => 'City',
			'state' => 'State',
			'zip_code' => 'Zip Code',
			'phone' => 'Phone',
			'website' => 'Website',
			'lat' => 'Lat',
			'long' => 'Long',
			'description' => 'Description',
			'facebook' => 'Facebook',
			'twitter' => 'Twitter',
			'mobile' => 'Mobile',
			'importance' => 'Importance'
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('address',$this->address,true);
		$criteria->compare('city',$this->city,true);
		$criteria->compare('state',$this->state,true);
		$criteria->compare('zip_code',$this->zip_code);
		$criteria->compare('phone',$this->phone,true);
		$criteria->compare('website',$this->website,true);
		$criteria->compare('lat',$this->lat,true);
		$criteria->compare('long',$this->long,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('facebook',$this->facebook,true);
		$criteria->compare('twitter',$this->twitter,true);
		$criteria->compare('mobile',$this->mobile,true);
		$criteria->compare('importance',$this->importance,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Advertiser the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
