<?php
/* @var $this ImageController */
/* @var $data Image */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('advertiser_id')); ?>:</b>
	<?php echo CHtml::encode($data->advertiser_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('image_uri')); ?>:</b>
	<?php echo CHtml::encode($data->image_uri); ?>
	<br />


</div>