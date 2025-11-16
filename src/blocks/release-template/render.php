<?php
namespace Marincarroll\Discogs;
use WP_Block;
/**
 * @var array $attributes
 * @var string $content
 * @var WP_Block $block
 */

$per_page = $block->context["marincarroll-discogs/perPage"];
$placeholder_items = array();
for( $i = 0; $i < $per_page; $i++ ) {
	$placeholder_items[] = '{}';
}
$placeholder_items = join(',', $placeholder_items );

$template_wrapper_attributes = array(
	'class' => 'discogs-release-template',
   'data-wp-interactive' => 'marincarroll/discogs',
   'data-wp-context' => '{"pages":[],"currentPage":1,"perPage":' . $per_page . ',"items":[' . $placeholder_items . ']}',
   'data-wp-init' => 'actions.init',
   'data-wp-run' => 'actions.fetchPage',
);

$normalized_attributes = array();
foreach ( $template_wrapper_attributes as $key => $value ) {
	$normalized_attributes[] = $key . '="' . esc_attr( $value ) . '"';
}
$template_wrapper_attribute_str = implode( ' ', $normalized_attributes );


$item_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-release',
	'data-wp-class--placeholder' => '!context.item.title'
) );

$item = sprintf(
	'<li %s>%s</li>',
	$item_wrapper_attributes,
	$content
);

$pagination = '<nav data-wp-bind--hidden="!context.maxPages" class="discogs-pagination">
	<ul data-wp-run="callbacks.buildPaginationButtons"></ul>
	</nav>';

printf(
	'<div %s><ul><template data-wp-each="context.items">%s</template></ul>%s</div>',
	$template_wrapper_attribute_str,
	$item,
	$pagination,
);
