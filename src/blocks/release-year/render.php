<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array $attributes
 * @var string $content
 * @var WP_Block $block
 */

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-release__year',
) );

printf(
	'<p %s></p>',
	$wrapper_attributes
);
