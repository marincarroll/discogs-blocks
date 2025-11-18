<?php
namespace Marincarroll\Discogs;
function register_block_bindings_release_sources() {
	register_block_bindings_source(
		'marincarroll-discogs/release-title',
		array(
			'label'              => __( 'Release Title', 'custom-bindings' ),
			'get_value_callback' => function () {},
		)
	);

	register_block_bindings_source(
		'marincarroll-discogs/release-year',
		array(
			'label'              => __( 'Release Year', 'custom-bindings' ),
			'get_value_callback' => function () {},
		)
	);

	register_block_bindings_source(
		'marincarroll-discogs/release-formats',
		array(
			'label'              => __( 'Release Formats', 'custom-bindings' ),
			'get_value_callback' => function () {},
		)
	);

	register_block_bindings_source(
		'marincarroll-discogs/release-artists',
		array(
			'label'              => __( 'Release Artists', 'custom-bindings' ),
			'get_value_callback' => function () {},
		)
	);
}
