<?php
/* @var $this AdvertiserController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Advertisers',
);

$this->menu=array(
	array('label'=>'Create Advertiser', 'url'=>array('create')),
	array('label'=>'Manage Advertiser', 'url'=>array('admin')),
);
?>

<h1>Advertisers</h1>


<table>
	<thead>
		<th>ID</th>
		<th>Name</th>
		<th>Address</th>
		<th>City</th>
		<th>State</th>
		<th>Zip Code</th>
	</thead>
	<tbody>
		<?php $this->widget('zii.widgets.CListView', array(
			'dataProvider'=>$dataProvider,
			'itemView'=>'_view',
		)); ?>
	</tbody>
</table>
