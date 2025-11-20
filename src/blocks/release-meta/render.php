<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array $attributes
 * @var string $content
 * @var WP_Block $block
 */

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-release__meta',
	'data-wp-text' => 'context.item.' . $attributes['type'],
) );

$tag_name = $attributes['level'] === 0 ? 'p' : 'h' . $attributes['level'];

printf(
	'<%1$s %2$s></%1$s>',
	$tag_name,
	$wrapper_attributes
);
