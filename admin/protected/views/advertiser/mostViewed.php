<?php
/* @var $this AdvertiserController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Advertisers',
);

$this->menu=array(
	array('label'=>'List Advertisers', 'url'=>array('index')),
	array('label'=>'Create Advertiser', 'url'=>array('create')),
	array('label'=>'Manage Advertiser', 'url'=>array('admin')),

);
?>

<h1>Advertisers by Views</h1>


<table>
	<thead>
		<th>ID</th>
		<th>Name</th>
		<th>Views</th>
	</thead>
	<tbody>
		<?php $this->widget('zii.widgets.CListView', array(
			'dataProvider'=>$dataProvider,
			'itemView'=>'_mView',
		)); ?>
	</tbody>
</table>
