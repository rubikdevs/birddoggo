<?php
/* @var $this ImageController */
/* @var $model Image */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'image-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'advertiser_id'); ?>
		<?php echo $form->textField($model,'advertiser_id'); ?>
		<?php echo $form->error($model,'advertiser_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'image_uri'); ?>
		<?php echo $form->textArea($model,'image_uri',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'image_uri'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->