<?php
/**
 * Creates options page to store API authentication.
 */

// TODO add uninstaller to delete options from database
namespace Marincarroll\Discogs;

class OptionsPage {
	private $_access_token;
	private $_discogs_user;
	private $_page_slug = 'marincarroll_discogs';

	public function __construct() {
		$this->_access_token  = get_option( 'access_token' );
		$this->validate_identity();

		add_action( 'admin_menu', array( $this, 'create_options_page' ) );
		add_action( 'admin_menu', array( $this, 'add_authentication_settings_section' ) );
		add_action( 'admin_init', array( $this, 'register_authentication_settings' ) );
	}

	function validate_identity() {
		if ( $this->_access_token ) {
			$identity_endpoint = add_query_arg( array(
				'token' => $this->_access_token,
			), 'https://api.discogs.com/oauth/identity' );

			$identity_response      = wp_remote_get( $identity_endpoint );
			$identity_response_code = wp_remote_retrieve_response_code( $identity_response );

			if ( $identity_response_code === 200 ) {
				$identity = json_decode( wp_remote_retrieve_body( $identity_response ) );

				$user_response = wp_remote_get( $identity->resource_url );
				$this->_discogs_user = json_decode( wp_remote_retrieve_body( $user_response ) );
			}
		};
	}

	public function create_options_page() {
		add_options_page(
			__( 'Discogs Blocks Settings', 'discogs-blocks' ),
			__( 'Discogs Blocks', 'discogs-blocks' ),
			'manage_options',
			'marincarroll_discogs',
			function () {
				?>
				<div class="wrap">
					<form method="post" action="options.php">
						<h1><?php esc_html_e( get_admin_page_title() ) ?></h1>
						<?php settings_fields( $this->_page_slug ) ?>
						<?php do_settings_sections( $this->_page_slug ) ?>
						<?php submit_button() ?>
					</form>
				</div>
				<?php
			}
		);
	}

	public function render_authentication_notice() {
		if ( ! $this->_access_token || ! $this->_discogs_user ) {
			$message          = sprintf(
				__( '%s <a href="%s" target="_blank">%s</a>.', 'discogs-blocks' ),
				__( 'You can generate a new access token by visiting', 'discogs-blocks' ),
				esc_url( 'https://www.discogs.com/settings/developers' ),
				__( 'Discogs Developer Settings', 'discogs-blocks' )
			);
			$notice_class_str = 'notice inline';

			if ( $this->_access_token ) {
				$message          = __( 'Invalid token.', 'discogs-blocks' ) . ' ' . $message;
				$notice_class_str .= ' error';
			}

			return '<div class="' . $notice_class_str . '"><p>' . $message . '</p></div>';
		} else {
			$message            = sprintf(
				__( 'Validated user <a href="%s">%s</a>.', 'discogs-blocks' ),
				esc_url( $this->_discogs_user->uri ),
				esc_html( $this->_discogs_user->name )
			);

			return '<div class="notice inline notice-info"><p>' . $message . '</p></div>';
		}
	}

	public function add_authentication_settings_section() {
		add_settings_section(
			$this->_page_slug . '_authentication',
			__( 'API authentication', 'discogs-blocks' ),
			'',
			$this->_page_slug,
			array(
				'after_section' => $this->render_authentication_notice(),
			)
		);

		$token = get_option( $this->_page_slug . '_authentication_token' );

		add_settings_field(
			'access_token',
			__( 'Personal Access Token', 'discogs-blocks' ),
			array( $this, 'render_token_field' ),
			$this->_page_slug,
			$this->_page_slug . '_authentication',
			array(
				'label_for' => 'access_token'
			)
		);
	}

	public function render_token_field() {
		printf(
			'<input type="text" id="%1$s" name="%1$s" value="%2$s" />',
			'access_token',
			isset( $this->_access_token ) ? esc_attr( $this->_access_token ) : '',
		);
	}

	public function register_authentication_settings() {
		register_setting(
			$this->_page_slug,
			'access_token',
			array(
				'type'              => 'string',
				'sanitize_callback' => array( $this, 'sanitize_token_field' ),
				//'show_in_rest' => false,
				//'label' => '',
				//'description' => '',
			)
		);
	}

	public function sanitize_token_field( $input ) {
		return preg_replace(
			'/[^A-Za-z]/',
			'',
			$input
		);
	}
}






