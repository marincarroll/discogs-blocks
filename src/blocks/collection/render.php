<?php
namespace Marincarroll\Discogs;
/**
 * @var array $attributes
 * @var string $content
 */

$block_wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'discogs-collection',
) );

printf(
	'<div %s>%s</div>',
	$block_wrapper_attributes,
	$content,
);
