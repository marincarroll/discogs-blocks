<?php
/**
 * Creates options page to store API authentication.
 */

// TODO add uninstaller to delete options from database
namespace Marincarroll\Discogs;

class OptionsPage {
	/**
	 * @var string|null Discogs personal access token.
	 *
	 * @see https://www.discogs.com/developers?srsltid=AfmBOoph0wqYbt-opRgM9uWpbYWPx4xqnZDOKdSl1myKWREh6KNll5mY#page:authentication,header:authentication-discogs-auth-flow
	 */
	private $_access_token;

	/**
	 * @var object Identity object from Discogs API.
	 *
	 * @see https://www.discogs.com/developers?srsltid=AfmBOoph0wqYbt-opRgM9uWpbYWPx4xqnZDOKdSl1myKWREh6KNll5mY#page:user-identity,header:user-identity-identity
	 */
	private $_discogs_identity;

	/**
	 * @var object User profile object from Discogs API.
	 *
	 * @see https://www.discogs.com/developers?srsltid=AfmBOoph0wqYbt-opRgM9uWpbYWPx4xqnZDOKdSl1myKWREh6KNll5mY#page:user-identity,header:user-identity-profile
	 */
	private $_discogs_user;

	/**
	 * @var string Slug shared between options group and options page.
	 */
	private $_page_slug = 'marincarroll_discogs';

	public function __construct() {
		$this->_access_token = get_option( 'discogs_access_token', '' );
		$this->_discogs_identity = get_option( 'discogs_identity', '' );
		$this->set_discogs_user();

		add_action( 'admin_menu', array( $this, 'create_options_page' ) );
		add_action( 'admin_menu', array( $this, 'add_authentication_settings_section' ) );
		add_action( 'admin_init', array( $this, 'register_authentication_settings' ) );
		add_action( 'updated_option', array( $this, 'update_discogs_identity_option' ), 10, 3 );
	}

	/**
	 * When personal access token is updated, use it to validate and retrieve a user Identity, then set the
	 * discogs_identity option.
	 *
	 * @param string        $option    Name of the updated option.
	 * @param object|string $old_value The old option value.
	 * @param object|string $value     The new option value.
	 */
	public function update_discogs_identity_option( $option, $old_value, $value ) {
		if( $option === 'discogs_access_token' ) {
			$next_identity = '';

			if ( $value ) {
				$identity_endpoint = add_query_arg( array(
					'token' => $value,
				), DISCOGS_REST_ROUTE . '/oauth/identity' );

				$identity_response = wp_remote_get( $identity_endpoint );
				if ( wp_remote_retrieve_response_code( $identity_response ) === 200 ) {
					$next_identity = json_decode( wp_remote_retrieve_body( $identity_response ) );
				}
			};

			update_option( 'discogs_identity', $next_identity );
		}
	}


	/**
	 * Gets Discogs User Profile from API, if user Identity is valid.
	 */
	private function set_discogs_user() {
		if( $this->_discogs_identity ) {
			$user_response = wp_remote_get( $this->_discogs_identity->resource_url );
			$this->_discogs_user = json_decode( wp_remote_retrieve_body( $user_response ) );
		}
	}

	/**
	 * Creates admin Settings page and form.
	 */
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

	/**
	 * Renders user notice displaying whether a valid personal access token has been entered.
	 */
	private function render_authentication_notice() {
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
				__( 'Validated user <a href="%s">%s</a>. We\'ll use this as the default when displaying Collections, Lists and Wantlists.', 'discogs-blocks' ),
				esc_url( $this->_discogs_user->uri ),
				esc_html( $this->_discogs_user->name )
			);

			return '<div class="notice inline notice-info"><p>' . $message . '</p></div>';
		}
	}

	/**
	 * Creates Authentication Settings section for admin Settings page.
	 */
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

		add_settings_field(
			'discogs_access_token',
			__( 'Personal Access Token', 'discogs-blocks' ),
			array( $this, 'render_token_field' ),
			$this->_page_slug,
			$this->_page_slug . '_authentication',
			array(
				'label_for' => 'discogs_access_token'
			)
		);
	}

	/**
	 * Renders input field for the personal access token.
	 */
	public function render_token_field() {
		printf(
			'<input type="text" id="%1$s" name="%1$s" value="%2$s" />',
			'discogs_access_token',
			isset( $this->_access_token ) ? esc_attr( $this->_access_token ) : '',
		);
	}

	/**
	 * Registers authentication options.
	 */
	public function register_authentication_settings() {
		register_setting(
			$this->_page_slug,
			'discogs_access_token',
			array(
				'type'              => 'string',
				'sanitize_callback' => array( $this, 'sanitize_token_field' ),
				//'show_in_rest' => false,
				//'label' => '',
				//'description' => '',
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
	public function sanitize_token_field( $input ) {
		return preg_replace(
			'/[^A-Za-z]/',
			'',
			$input
		);
	}
}






