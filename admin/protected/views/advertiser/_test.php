<?php 
/* @var $model Model */
	echo 'Keywords: ';
	
	?>
	
	<?php
	foreach($advertiser->keywords as $keyword)
	{	
		
		?>

		<div class="keyword">
			<?php echo $keyword->name.' ';
				echo CHtml::ajaxLink('x',Yii::app()->createUrl( 'advertiser/ajix' ),
						array(
				            'type'=>'post',
				            'update'=>'#keywords',
				            'data' => array(
				            	'advertiser_id'=>$advertiser->id,
				            	'keyword_id'=>$keyword->id
			       			)
		        		),
		        		array('id'=>'link'.uniqid())
	            	);
			?>
			
		</div>
<?php 
	} ?>