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
	<?php echo CHtml::encode($data->views); ?>
	</td>


</div>