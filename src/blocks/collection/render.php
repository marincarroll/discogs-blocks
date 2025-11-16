<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array    $attributes
 * @var string   $content
 * @var WP_Block $block;
 */

$block_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-collection',
) );

printf(
	'<div %s>%s</div>',
	$block_wrapper_attributes,
	$content,
);
