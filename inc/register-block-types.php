<?php
namespace Marincarroll\Discogs;

/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function register_block_types() {
	$blocks_dir = BUILD_DIR . '/blocks';
	$manifest = BUILD_DIR . '/blocks-manifest.php';

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( $blocks_dir, $manifest );
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	wp_register_block_metadata_collection( $blocks_dir, $manifest );
}

/**
 * Adds custom Discogs Blocks category.
 *
 * @param array $categories The initial category list.
 *
 * @return array The updated category list.
 */
function add_block_category( $categories ) {
	return array(
		...$categories,
		array(
			'slug'	=> 'discogs-blocks',
			'title' => __('Discogs Blocks', 'discogs-blocks')
		)
	);
}
