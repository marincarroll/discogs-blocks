<?php
/**
 * Creates options page to store API authentication.
 */

// TODO add uninstaller to delete options from database
namespace Marincarroll\Discogs;

class OptionsPage {
	private $_access_token;
	private $_page_slug = 'marincarroll_discogs';

	public function __construct() {
		$this->_access_token = get_option( 'access_token' );

		add_action( 'admin_menu', array( $this, 'create_options_page' ) );
		add_action( 'admin_menu', array( $this, 'add_authentication_settings_section' ) );
		add_action( 'admin_init', array( $this, 'register_authentication_settings' ) );
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
		if( ! $this->_access_token ) {
			$message = sprintf(
				__('%s <a href="%s" target="_blank">%s</a>.', 'discogs-blocks'),
				__( 'You can generate a new access token by visiting', 'discogs-blocks' ),
				esc_url( 'https://www.discogs.com/settings/developers'),
				__( 'Discogs Developer Settings', 'discogs-blocks' )
			);

			return '<div class="notice inline"><p>' . $message . '</p></div>';
		} else {
			return '<div class="notice inline notice-info"><p>this will be an identity panel</p></div>';
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
			'Personal Access Token',
			array( $this, 'render_token_field' ),
			$this->_page_slug,
			$this->_page_slug . '_authentication'
		);
	}

	public function render_token_field() {
		printf(
			'<label for="%1$s" class="screen-reader-text">%2$s</label><input type="text" id="%1$s" name="%1$s" value="%3$s" />',
			'access_token',
			__( 'Enter Personal Access Token', 'discogs-blocks' ),
			isset( $this->_access_token ) ? esc_attr( $this->_access_token ) : '',
		);
	}

	public function register_authentication_settings() {
		register_setting(
			$this->_page_slug,
			'access_token',
			array(
				'type' => 'string',
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






