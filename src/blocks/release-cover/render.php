<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array $attributes
 * @var string $content
 * @var WP_Block $block
 */

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-release__cover',
) );

printf(
	'<div %s><img data-wp-bind--src="context.item.coverImage" data-wp-bind--alt="%s"/></div>',
	$wrapper_attributes,
	__( 'Cover image', 'discogs-blocks' ),
);
