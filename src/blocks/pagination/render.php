<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array $attributes
 * @var string $content
 * @var WP_Block $block
 */

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-pagination',
	'data-wp-bind--hidden' => '!context.maxPages',
) );

printf(
	'<nav %s><ul data-wp-run="callbacks.buildPaginationButtons"></ul></nav>',
	$wrapper_attributes
);
