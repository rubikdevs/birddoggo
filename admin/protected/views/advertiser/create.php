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
	array('label'=>'Most Viewed', 'url'=>array('viewed')),
);
?>

<h1>Create Advertiser</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>