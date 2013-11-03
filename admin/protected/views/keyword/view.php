<?php
/* @var $this KeywordController */
/* @var $model Keyword */

$this->breadcrumbs=array(
	'Keywords'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Keyword', 'url'=>array('index')),
	array('label'=>'Create Keyword', 'url'=>array('create')),
	array('label'=>'Update Keyword', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Keyword', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Keyword', 'url'=>array('admin')),
);
?>

<h1>View Keyword #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'name',
	),
)); ?>
