<?php
/**
 * Plugin Name:       Discogs Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       discogs-blocks
 *
 * @package Marincarroll\Discogs
 */
namespace Marincarroll\Discogs;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! defined( 'Marincarroll\Discogs\BUILD_DIR' ) ) {
	define( 'Marincarroll\Discogs\BUILD_DIR', plugin_dir_path(__FILE__) . '/build');
}

if ( ! defined( 'Marincarroll\Discogs\BUILD_URL' ) ) {
	define( 'Marincarroll\Discogs\BUILD_URL', plugin_dir_url(__FILE__) . '/build');
}

// Registers block types.
require_once 'inc/register-block-types.php';
add_action( 'init', 'Marincarroll\Discogs\register_block_types' );

// Creates settings and options page.
require_once 'inc/class-options-page.php';
add_action( 'init', function () { new OptionsPage(); } );
