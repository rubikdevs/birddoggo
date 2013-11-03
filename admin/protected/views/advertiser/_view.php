<?php
/* @var $this AdvertiserController */
/* @var $data Advertiser */
?>

<tr>

	<td>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	</td>

	<td>
	<?php echo CHtml::encode($data->name); ?>
	</td>

	<td>
	<?php echo CHtml::encode($data->address); ?>
	</td>

	<td>
	<?php echo CHtml::encode($data->city); ?>
	</td>

	<td>
	<?php echo CHtml::encode($data->state); ?>
	</td>

	<td>
	<?php echo CHtml::encode($data->zip_code); ?>
	</td>
<?php /*
	<td>
	<?php echo CHtml::encode($data->phone); ?>
	</td>

	
	<b><?php echo CHtml::encode($data->getAttributeLabel('website')); ?>:</b>
	<?php echo CHtml::encode($data->website); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('lat')); ?>:</b>
	<?php echo CHtml::encode($data->lat); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('long')); ?>:</b>
	<?php echo CHtml::encode($data->long); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('description')); ?>:</b>
	<?php echo CHtml::encode($data->description); ?>
	<br />

	*/ ?>

</div>