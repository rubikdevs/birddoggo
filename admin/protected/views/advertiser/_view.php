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
	<td>
	<?php echo CHtml::encode($data->views); ?>
	</td>


</div>