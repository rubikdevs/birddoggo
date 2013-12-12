<?php
/* @var $this AdvertiserController */
/* @var $model Advertiser */

$this->breadcrumbs=array(
	'Advertisers'=>array('index'),
	$model->id=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Advertiser', 'url'=>array('index')),
	array('label'=>'Create Advertiser', 'url'=>array('create')),
	array('label'=>'View Advertiser', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Advertiser', 'url'=>array('admin')),
	array('label'=>'Most Viewed', 'url'=>array('viewed')),
);
?>

<h1>Update Advertiser <?php echo $model->id; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>