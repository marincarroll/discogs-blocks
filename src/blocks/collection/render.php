<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array    $attributes
 * @var string   $content
 * @var WP_Block $block;
 */

$placeholder_items = array();
for( $i = 0; $i < $attributes['perPage']; $i++ ) {
	$placeholder_items[] = '{}';
}
$placeholder_items = join(',', $placeholder_items );

$block_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-collection',
	'data-wp-interactive' => 'marincarroll/discogs',
	'data-wp-context' => '{"currentPage":1,"perPage":' . $attributes['perPage'] . ',"items":[' . $placeholder_items . ']}',
	'data-wp-run' => 'actions.load',
) );

printf(
	'<div %s>%s<nav data-wp-bind--hidden="!context.pagination" class="discogs-collection__pagination"><ul data-wp-run="callbacks.buildPaginationButtons"></ul></nav></div>',
	$block_wrapper_attributes,
	$content,
);
