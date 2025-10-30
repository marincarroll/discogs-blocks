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
			'marincarroll_discogs_authentication',
			__('API authentication', 'discogs-blocks'),
			'',
			$this->_page_slug
		);

		add_settings_field(
			'token',
			'Your Discogs API Token',
			function(){
				echo '<input id="token" type="text">token field</input>';
			},
			$this->_page_slug,
			$this->_page_slug . '_authentication'
		);
	}

	public function register_authentication_settings() {
		register_setting(
			$this->_page_slug . '_authentication',
			$this->_page_slug . '_authentication_token',
			array (
				'type'    => 'string',
				'default' => ''
			)
		);
	}
}






