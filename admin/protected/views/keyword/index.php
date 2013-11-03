<?php
/* @var $this KeywordController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Keywords',
);

$this->menu=array(
	array('label'=>'Create Keyword', 'url'=>array('create')),
	array('label'=>'Manage Keyword', 'url'=>array('admin')),
);
?>

<h1>Keywords</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
