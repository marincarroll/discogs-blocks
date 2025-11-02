<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array $attributes
 * @var string $content
 * @var WP_Block $block
 */

$item_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-collection__item',
) );

$item = sprintf(
	'<li %s>%s</li>',
	$item_wrapper_attributes,
	$content
);

printf(
	'<ul class="discogs-collection__item-template">%s</ul>',
	str_repeat( $item, $block->context['marincarroll-discogs/perPage'] )
);
