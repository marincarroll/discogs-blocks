<?php
namespace Marincarroll\Discogs;
/**
 * Registers authentication options.
 */
function register_authentication_settings() {
	register_setting(
		'marincarroll_discogs',
		'discogs_access_token',
		array(
			'sanitize_callback' => 'Marincarroll\Discogs\sanitize_discogs_token_field',
		)
	);

	/*register_setting(
		'marincarroll_discogs',
		'discogs_user_url',
		array(
		//	'default' => '',
			'sanitize_callback' => 'Marincarroll\Discogs\sanitize_discogs_user_url_field',
		)
	);*/
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

function sanitize_discogs_user_url_field( $input ) {
	return $input;

	if( $input ) {
		//return esc_url( $input );
	}
}

