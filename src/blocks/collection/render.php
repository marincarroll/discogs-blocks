<?php
namespace Marincarroll\Discogs;
/**
 * @var array    $attributes The array of attributes for the block.
 * @var string   $content    The markup of the block as stored in the database, if any.
 * @var WP_Block $block      The instance of the WP_Block class that represents the rendered block.
 */
$attributes['folderId'] = 0; //todo
//TODO render with JS, this should be a placeholder
$collection = build_users_rest_endpoint( '/collection/folders/' . $attributes['folderId'] . '/releases' );
var_dump($collection);
