<?php
/**
 * @var array $attributes
 * @var string $content
 */
namespace Marincarroll\Discogs;

$block_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-collection',
) );

printf(
	'<div %s>%s</div>',
	$block_wrapper_attributes,
	$content
);
