<?php
/* @var $this AdvertiserController */
/* @var $id Advertiser */
/* @var $keyword Keyword */
$model = Advertiser::model()->findByPk($id);
$keyword = new Keyword;


$this->breadcrumbs=array(
	'Advertisers'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Advertiser', 'url'=>array('index')),
	array('label'=>'Create Advertiser', 'url'=>array('create')),
	array('label'=>'Update Advertiser', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Advertiser', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Advertiser', 'url'=>array('admin')),
);
?>

<h1>View Advertiser #<?php echo $model->id; ?></h1>

<?php 
	$this->widget('zii.widgets.CDetailView', array(
		'data'=>$model,
		'attributes'=>array(
			'id',
			'name',
			'address',
			'city',
			'state',
			'zip_code',
			'phone',
			'website',
			'lat',
			'long',
			'description',
		),
	));?>



<h1>Image</h1>

<div id="images" class="clear">
	<?php $this->renderPartial('_upload', array('advertiser'=>$model)); ?>
</div>

<p class="clear"><?php echo CHtml::link('Add Images', array('upload','id'=>$model->id));?></p>

<h1 class="clear">Add Keywords</h1>
	<div class="form">

	<?php $form=$this->beginWidget('CActiveForm', array(
		'id'=>'keyword-form',
		'enableAjaxValidation'=>false,
	)); ?>

		<p class="note">Fields with <span class="required">*</span> are required.</p>

		<?php echo $form->errorSummary($keyword); ?>

		<div class="row">
			<?php echo $form->labelEx($keyword,'name'); ?>
			<?php echo $form->textField($keyword,'name',array('size'=>60,'maxlength'=>255, 'id'=>'marianElAwesome')); ?>
			<?php echo $form->error($keyword,'name'); ?>
		</div>

		<div class="row buttons">
			
			<?php
			echo CHtml::ajaxSubmitButton( 
				'Send', 
				CHtml::normalizeUrl(array('test')).'&id='.$model->id,
			    array(
			        'update'=>'#keywords',
			        'beforeSend'=>'js:function(data){$("#marianElAwesome").val("");}'
				),
				 array('id' => 'ajaxButton')
			);
			?>
		</div>

	

	
	<?php $this->endWidget(); ?>

	</div><!-- form -->
	<div id="keywords">
		<?php $this->renderPartial('_test', array('advertiser'=>$model)); ?>
	</div>
