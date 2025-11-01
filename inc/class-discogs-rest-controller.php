<?php
namespace Marincarroll\Discogs;

use WP_REST_Controller, WP_REST_Server, WP_REST_Request, WP_REST_Response, WP_Error;

class Discogs_REST_Controller extends WP_REST_Controller {
	protected $namespace = 'marincarroll/v1';

	protected $rest_base = 'discogs';

	// TODO add schema

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		register_rest_route( $this->namespace, '/' . $this->rest_base . '/collection', array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_discogs_collection' ),
				'permission_callback' => '__return_true'
			),
		) );

		register_rest_route( $this->namespace, '/' . $this->rest_base . '/wants', array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_discogs_wantlist' ),
				'permission_callback' => '__return_true'
			),
		) );
	}

	static function build_discogs_rest_url( $path ) {
		$url = get_option('discogs_user_url' );
		$token = get_option( 'discogs_access_token' );

		return add_query_arg( 'token', $token, $url . $path );
	}

	/**
	 * TODO
	 *
	 * @return WP_REST_Response
	 */
	public function get_discogs_collection() {
		$url = self::build_discogs_rest_url( '/collection/folders/0/releases' );
		$discogs_response = wp_remote_get( $url );

		return new WP_REST_Response( $discogs_response, 200 );
	}

	/**
	 * TODO
	 *
	 * @return WP_REST_Response
	 */
	public function get_discogs_wantlist() {
		$url = self::build_discogs_rest_url( '/wants' );
		$discogs_response = wp_remote_get( $url );

		return new WP_REST_Response( $discogs_response, 200 );
	}
}
