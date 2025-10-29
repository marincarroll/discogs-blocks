<?php
/**
 * Creates options page to store API authentication.
 */
// TODO add uninstaller to delete options from database
namespace Marincarroll\Discogs;

function render_options_page() {
	?>

	<?php
}

function create_options_page() {
	add_options_page(
		__('Discogs Blocks Settings', 'discogs-blocks'),
		__('Discogs Blocks', 'discogs-blocks'),
		'manage_options',
		'marincarroll_discogs',
		function() {
			?>
				<div class="wrap">
					<h1><?php esc_html_e('Discogs Blocks Settings', 'discogs-blocks') ?></h1>
					<?php do_settings_sections('marincarroll_discogs') ?>
				</div>
			<?php
		}
	);
}

function create_authentication_settings() {
	add_settings_section(
		'marincarroll_discogs_authentication',
		__('API authentication', 'discogs-blocks'),
		'',
		'marincarroll_discogs'
	);

	register_setting(
		'marincarroll_discogs_authentication',
		'marincarroll_discogs_authentication_token',
		array (
			'type'    => 'string',
			'default' => ''
		)
	);

	add_settings_field(
		'token',
		'Your Discogs API Token',
		function(){
			echo '<input id="token" type="text">token field</input>';
		},
		'marincarroll_discogs',
		'marincarroll_discogs_authentication'
	);
}

