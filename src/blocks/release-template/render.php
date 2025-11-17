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
/*
$pagination = '<nav data-wp-bind--hidden="!context.maxPages" class="discogs-pagination">
	<ul data-wp-run="callbacks.buildPaginationButtons"></ul>
	</nav>';
*/
printf(
	'<div class="discogs-release-template"><ul><template data-wp-each="context.items">%s</template></ul></div>',
	$item,
//	$pagination,
);
