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
		register_rest_route( $this->namespace, '/' . $this->rest_base . '/folders(/*)(?P<folder>\d*)', array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_discogs_folder' ),
				'permission_callback' => '__return_true'
			),
		) );
	}

	/**
	 * Get a collection of items
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_discogs_folder( $request ) {
		$folder = $request['folder'] ? $request['folder'] : 0;
		$data = array( 'this will be a folder:' . $folder );
		return new WP_REST_Response( $data, 200 );
	}

	/**
	 * Prepare the item for the REST response
	 *
	 * @param mixed $item WordPress representation of the item.
	 * @param WP_REST_Request $request Request object.
	 * @return mixed
	 */
	public function prepare_item_for_response( $item, $request ) {
		return array();
	}

	/**
	 * Get the query params for collections
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return array(
			'page'     => array(
				'description'       => 'Current page of the collection.',
				'type'              => 'integer',
				'default'           => 1,
				'sanitize_callback' => 'absint',
			),
			'per_page' => array(
				'description'       => 'Maximum number of items to be returned in result set.',
				'type'              => 'integer',
				'default'           => 10,
				'sanitize_callback' => 'absint',
			),
			'search'   => array(
				'description'       => 'Limit results to those matching a string.',
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			),
		);
	}
}
