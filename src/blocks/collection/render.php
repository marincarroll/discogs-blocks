<?php
namespace Marincarroll\Discogs;
/**
 * @var array $attributes
 * @var string $content
 */

$block_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-collection',
	'data-per-page' => $attributes['perPage'],
) );

printf(
	'<div %s>%s<div class="discogs-collection__pagination"></div></div>',
	$block_wrapper_attributes,
	$content,
);
