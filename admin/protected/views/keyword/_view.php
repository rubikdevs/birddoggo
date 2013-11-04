<?php
/* @var $this KeywordController */
/* @var $data Keyword */
?>

<tr class="view">

	<td>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	</td>

	<td>
	<?php echo CHtml::encode($data->name); ?>
	</td>

</tr>