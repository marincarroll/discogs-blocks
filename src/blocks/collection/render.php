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
	$placeholder_items[] = '{ "title": "test", "year": 1970 }';
}

$block_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-collection',
	'data-wp-interactive' => 'marincarroll/discogs',
	'data-wp-context' => '{ "perPage": ' . $attributes['perPage'] . ', "items": [ ' . join(',', $placeholder_items ) . ' ] }',
	'data-wp-run' => 'actions.load',
) );

printf(
	'<div %s>%s<div class="discogs-collection__pagination"></div></div>',
	$block_wrapper_attributes,
	$content,
);
