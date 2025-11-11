<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array $attributes
 * @var string $content
 * @var WP_Block $block
 */

$item_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-release',
	'data-wp-class--placeholder' => '!context.item.title'
) );

$item = sprintf(
	'<li %s>%s</li>',
	$item_wrapper_attributes,
	$content
);

printf(
	'<ul class="discogs-release-template"><template data-wp-each="context.items">%s</template></ul>',
	$item,
);
