<?php
namespace Marincarroll\Discogs;

use WP_HTML_Tag_Processor;

function move_pagination_layout_classes( $block_content ) {
	$processor      = new WP_HTML_Tag_Processor( $block_content );
	$layout_classes = array();

	$processor->next_tag( 'nav' );
	foreach ( $processor->class_list() as $class_name ) {
		if ( str_contains( $class_name, 'layout' ) ) {
			array_push( $layout_classes, $class_name );
			$processor->remove_class( $class_name );
		}
	}

	$processor->next_tag( 'ul' );
	foreach ( $layout_classes as $layout_class ) {
		$processor->add_class( $layout_class );
	}

	return $processor->get_updated_html();
}
