<?php
/* @var $this AdvertiserController */
/* @var $model Advertiser */

$this->breadcrumbs=array(
	'Advertisers'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Advertiser', 'url'=>array('index')),
	array('label'=>'Manage Advertiser', 'url'=>array('admin')),
);
?>

<h1>Create Advertiser</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>