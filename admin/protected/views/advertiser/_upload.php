<?php 
/* @var $model Model */
	echo 'Image previews: <br>';
	foreach($advertiser->images as $image)
	{
		$path = 'images/'.$advertiser->id.'-'.$image->image_uri;
		//echo '<img src="images/'.$advertiser->id.'-'.$image->image_uri.'" width="100" height="100" >';
		//echo CHtml::link('X',array('advertiser/deleteImage','id'=>$image->id));
		?>
		<div style="background:url('<?php echo $path ?>'); background-size:cover" class="imageThumb">
			<?php echo CHtml::link('Delete',array('advertiser/deleteImage','id'=>$image->id));?>
		</div>
		<?php
	}
?>