<?php
namespace Marincarroll\Discogs;
use WP_Block;
use WP_HTML_Processor;
use WP_HTML_Tag_Processor;

if ( ! defined( 'Marincarroll\Discogs\BINDINGS_NAMESPACE' ) ) {
	define( 'Marincarroll\Discogs\BINDINGS_NAMESPACE', 'marincarroll-discogs');
}
function register_block_bindings_release_sources() {
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
	$has_bound_content = $bindings['content'] && str_starts_with( $bindings['content']['source'], BINDINGS_NAMESPACE );
	//$has_bound_src = $bindings['src'] && str_starts_with( $bindings['content']['source'], BINDINGS_NAMESPACE );
	//$has_bound_alt = $bindings['alt'] && str_starts_with( $bindings['content']['source'], BINDINGS_NAMESPACE );
	if( $has_bound_content ) {
		$content_type = str_replace(
			BINDINGS_NAMESPACE . '/release-',
			'',
			$bindings['content']['source']
		);
		echo $content_type;

		$tags = new WP_HTML_Tag_Processor( $block_content );
		$tags->next_tag();
		$tags->set_attribute( 'data-wp-text' , 'context.item.' . $content_type );

		return $tags->get_updated_html();
	}

	return $block_content;

}
