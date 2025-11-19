<?php

namespace Marincarroll\Discogs;

use WP_REST_Controller, WP_REST_Server, WP_REST_Request, WP_REST_Response, WP_Error;

class Discogs_REST_Controller extends WP_REST_Controller {
	protected $namespace = 'marincarroll/v1';

	protected $rest_base = 'discogs';

	static private $collections_path = '/collection/folders/0/releases';

	// TODO add schema.

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$pagination_args = array(
			'perPage' => array(
				'type'              => 'integer',
				'required'          => true,
				'default' => 10, //todo temp
				'validate_callback' => function ( $param ) {
					return is_numeric( $param );
				}
			),
			'page' => array(
				'type'              => 'integer',
				'required'          => true,
				'default'           => 1,
				'validate_callback' => function ( $param ) {
					return is_numeric( $param );
				}
			),
		);

		register_rest_route( $this->namespace, '/' . $this->rest_base . '/collection', array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_discogs_collection' ),
				'permission_callback' => '__return_true',
				'args'                => $pagination_args
			),
		) );

		register_rest_route( $this->namespace, '/' . $this->rest_base . '/collection/releases', array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_discogs_collection_releases' ),
				'permission_callback' => '__return_true',
				'args'                => $pagination_args
			),
		) );
	}

	static function build_discogs_rest_url( $path, $per_page, $page ) {
		$url   = get_option( 'discogs_user_url' );
		$token = get_option( 'discogs_access_token' );

		// TODO throw error when no access token added. Prevent using blocks when no access token added.
		return add_query_arg( array(
			'token'    => $token,
			'per_page' => $per_page,
			'page'     => $page,
		), $url . $path );
	}

	/**
	 * TODO
	 *
	 * @return WP_REST_Response
	 */
	static function get_discogs_collection( $request ) {
		$release_list = self::get_discogs_release_list( $request, self::$collections_path );

		return new WP_REST_Response( $release_list, 200 );
	}

	static function get_discogs_collection_releases( $request ) {
		$release_list = self::get_discogs_release_list( $request, self::$collections_path );
		$releases = $release_list->releases;

		return new WP_REST_Response( $releases, 200 );
	}

	private static function get_discogs_release_list( $request, $path ) {
		$params = $request->get_params();
		$url = self::build_discogs_rest_url( $path, $params['perPage'], $params['page'] );
		$discogs_response = wp_remote_get( $url );

		$body = wp_remote_retrieve_body( $discogs_response );
		return json_decode( $body );
	}
}
