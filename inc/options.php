<?php
namespace Marincarroll\Discogs;
/**
 * Registers authentication options.
 */
function register_discogs_access_token_setting() {
	register_setting(
		'marincarroll_discogs',
		'discogs_access_token',
		array(
			'sanitize_callback' => 'Marincarroll\Discogs\sanitize_discogs_token_field',
			// 'default' => '' TODO: mysteriously breaks user url storage.
		)
	);
}

/**
 * Removes non-alphabetical characters from user-entered personal access token.
 *
 * @param $input string User-entered personal access token.
 *
 * @return string Personal access token without non-alphabetical characters.
 */
function sanitize_discogs_token_field( $input ) {
	return preg_replace(
		'/[^A-Za-z]/',
		'',
		$input
	);
}

function register_discogs_user_url_setting() {
	register_setting(
		'marincarroll_discogs',
		'discogs_user_url',
		array(
			'type' => 'string',
			'sanitize_callback' => 'Marincarroll\Discogs\sanitize_discogs_user_url_field',
			'show_in_rest' => array(
				'schema' => array(
					'format' => 'uri',
				),
			),
		)
	);
}

function sanitize_discogs_user_url_field( $input ) {
	if( $input ) {
		return esc_url( $input );
	}
}

