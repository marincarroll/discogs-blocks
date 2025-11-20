<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array $attributes
 * @var string $content
 * @var WP_Block $block
 */


$item_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-release-template',
	'data-wp-interactive' => 'marincarroll/discogs'
) );

$item = sprintf(
	'<li class="discogs-release" data-wp-class--placeholder="!context.item.title">%s</li>',
	$content
);

printf(
	'<ul %s><template data-wp-each="context.items">%s</template></ul>',
	$item_wrapper_attributes,
	$item,
);
