<?php
$form = $this->beginWidget(
    'CActiveForm',
    array(
        'id' => 'upload-form',
        'enableAjaxValidation' => false,
        'htmlOptions' => array('enctype' => 'multipart/form-data'),
    )
);

// ...
?>
<h1>Upload Image</h1>
<?php 
        echo $form->fileField($model, 'image_uri');
        echo CHtml::submitButton('upload'); // ...
        
   $this->endWidget();
?>








