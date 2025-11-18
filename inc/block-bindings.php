<?php
namespace Marincarroll\Discogs;
use WP_HTML_Tag_Processor;

if ( ! defined( 'Marincarroll\Discogs\BINDINGS_NAMESPACE' ) ) {
	define( 'Marincarroll\Discogs\BINDINGS_NAMESPACE', 'marincarroll-discogs');
}
function register_block_bindings_release_sources() {
	register_block_bindings_source(
		BINDINGS_NAMESPACE .'/release-alt',
		array(
			'label'              => __( 'Release Cover Alt Text', 'custom-bindings' ),
			'get_value_callback' => function () {
				return __('Cover image', 'discogs-blocks');
			},
		)
	);

	register_block_bindings_source(
		BINDINGS_NAMESPACE .'/release-image',
		array(
			'label'              => __( 'Release Cover Image', 'custom-bindings' ),
			'get_value_callback' => function () {
				return '#'; // Image block won't render without url attribute
			},
		)
	);

	register_block_bindings_source(
		BINDINGS_NAMESPACE .'/release-title',
		array(
			'label'              => __( 'Release Title', 'custom-bindings' ),
			'get_value_callback' => function () {},
		)
	);

	register_block_bindings_source(
		BINDINGS_NAMESPACE . '/release-year',
		array(
			'label'              => __( 'Release Year', 'custom-bindings' ),
			'get_value_callback' => function () {},
		)
	);

	register_block_bindings_source(
		BINDINGS_NAMESPACE . '/release-formats',
		array(
			'label'              => __( 'Release Formats', 'custom-bindings' ),
			'get_value_callback' => function () {},
		)
	);

	register_block_bindings_source(
		BINDINGS_NAMESPACE . '/release-artists',
		array(
			'label'              => __( 'Release Artists', 'custom-bindings' ),
			'get_value_callback' => function () {},
		)
	);
}

function convert_binding_to_interactive_attribute( string $block_content, array $block ) {
	if( !isset( $block['attrs']['metadata']['bindings'] ) ) {
		return $block_content;
	}

	$bindings = $block['attrs']['metadata']['bindings'];
	$has_bound_content = isset( $bindings['content'] ) && str_starts_with( $bindings['content']['source'], BINDINGS_NAMESPACE );
	$has_bound_url = isset( $bindings['url'] ) && str_starts_with( $bindings['url']['source'], BINDINGS_NAMESPACE );

	if( ! $has_bound_content && ! $has_bound_url ) {
		return $block_content;
	}

	$tags = new WP_HTML_Tag_Processor( $block_content );

	// TODO refactor, extract shared logic.
	if( $has_bound_content ) {
		$value = str_replace(
			BINDINGS_NAMESPACE . '/release-',
			'context.item.',
			$bindings['content']['source']
		);

		$tags->next_tag();
		$tags->set_attribute( 'data-wp-text', $value );
	}

	if( $has_bound_url ){
		$value = str_replace(
			BINDINGS_NAMESPACE . '/release-',
			'context.item.',
			$bindings['url']['source']
		);

		$tags->next_tag('img');
		$tags->set_attribute( 'data-wp-bind--src', $value );

	}

	return $tags->get_updated_html();
}
