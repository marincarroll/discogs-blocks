<?php
/**
 * Creates options page to store API authentication.
 */
// TODO add uninstaller to delete options from database
namespace Marincarroll\Discogs;

class OptionsPage {
	private $_options;
	private $_page_slug = 'marincarroll_discogs';

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'create_options_page' ) );
		add_action( 'admin_menu', array( $this, 'add_authentication_settings_section' ) );
		add_action( 'admin_init', array( $this, 'register_authentication_settings' ) );
	}

	public function create_options_page() {
		add_options_page(
			__('Discogs Blocks Settings', 'discogs-blocks'),
			__('Discogs Blocks', 'discogs-blocks'),
			'manage_options',
			'marincarroll_discogs',
			function() {
				?>
				<div class="wrap">
					<form method="post" action="options.php">
						<h1><?php esc_html_e( get_admin_page_title() ) ?></h1>
						<?php settings_fields( $this->_page_slug ) ?>
						<?php do_settings_sections($this->_page_slug ) ?>
						<?php submit_button() ?>
					</form>
				</div>
				<?php
			}
		);
	}

	public function add_authentication_settings_section() {
		add_settings_section(
			$this->_page_slug . '_authentication',
			__('API authentication', 'discogs-blocks'),
			'',
			$this->_page_slug
		);

		$token = get_option( $this->_page_slug . '_authentication_token' );

		add_settings_field(
			'access_token',
			'Personal Access Token',
			array( $this, 'authentication_token_field_callback' ),
			$this->_page_slug,
			$this->_page_slug . '_authentication'
		);
	}

	public function authentication_token_field_callback() {
		$option_name = 'access_token';
		$option = get_option( $option_name );

		printf(
			'<label for="%1$s" class="screen-reader-text">%2$s</label><input type="text" id="%1$s" name="%1$s" value="%3$s" />',
			$option_name,
			__('Enter Personal Access Token', 'discogs-blocks'),
			isset( $option ) ? esc_attr( $option ) : '',
		);
	}

	public function register_authentication_settings() {
		register_setting(
			$this->_page_slug,
			'access_token',
			array (
				'type'    => 'string',
				'default' => ''
			)
		);
	}
}






