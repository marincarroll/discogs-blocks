<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array    $attributes
 * @var string   $content
 * @var WP_Block $block;
 */

$list = array();

for( $i = 0; $i < $attributes['perPage']; $i++ ) {
	$list[] = '{}';
}

$block_wrapper_attributes = get_block_wrapper_attributes( array(
	'data-wp-interactive' => 'marincarroll/discogs',
	'data-wp-context' => '{ "list": [ ' . join(',', $list ) . ' ] }',
	'class' => 'discogs-collection',
	'data-per-page' => $attributes['perPage'],
) );

printf(
	'<div %s>%s<div class="discogs-collection__pagination"></div></div>',
	$block_wrapper_attributes,
	$content,
);
