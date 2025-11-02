<?php
/**
 * Plugin Name:       Discogs Blocks
 * Description:       Displays a user's collection from Discogs.com.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Marincarroll
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

if ( ! defined( 'Marincarroll\Discogs\DISCOGS_REST_ROUTE' ) ) {
	define( 'Marincarroll\Discogs\DISCOGS_REST_ROUTE', 'https://api.discogs.com');
}

// Registers block types.
require_once 'inc/register-block-types.php';
add_action( 'init', 'Marincarroll\Discogs\register_block_types' );
add_filter( 'block_categories_all', 'Marincarroll\Discogs\add_block_category' );

// Creates options.
require_once 'inc/options.php';
add_action( 'admin_init', 'Marincarroll\Discogs\register_discogs_access_token_setting' );
//add_action( 'admin_init', 'Marincarroll\Discogs\register_discogs_user_url_setting' );  TODO: mysteriously breaks user url storage.
add_action( 'rest_api_init', 'Marincarroll\Discogs\register_discogs_user_url_setting' );

// Creates options page.
require_once 'inc/class-options-page.php';

$options_page = new OptionsPage();

add_action( 'admin_menu', array( $options_page, 'create_options_page' ) );
add_action( 'admin_menu', array( $options_page, 'add_authentication_settings_section' ) );
add_action( 'update_option_discogs_access_token', array( $options_page, 'update_discogs_user_url_option' ), 10, 3 );

require_once 'inc/class-discogs-rest-controller.php';

$rest_controller = new Discogs_REST_Controller();

add_action( 'rest_api_init', array( $rest_controller, 'register_routes' ) );
