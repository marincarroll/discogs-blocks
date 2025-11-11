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
	'data-wp-context' => '{"page":1,"perPage":' . $attributes['perPage'] . ',"items":[' . $placeholder_items . ']}',
	'data-wp-run' => 'actions.load',
) );

printf(
	'<div %s>%s<div class="discogs-collection__pagination"></div></div>',
	$block_wrapper_attributes,
	$content,
);
