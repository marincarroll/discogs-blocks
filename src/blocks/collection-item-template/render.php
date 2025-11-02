<?php
namespace Marincarroll\Discogs;
/*
$block_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-collection__item',
) );*/

$placeholder_item = '<div class="discogs-collection__item placeholder">
<div class="discogs-collection__image"></div>
	<h2 class="discogs-collection__title"></h2>
	<h3 class="discogs-collection__artists"></h3>
	<div class="discogs-collection__details"></div>
</div>';

printf(
	str_repeat( $placeholder_item, 21 )
);
