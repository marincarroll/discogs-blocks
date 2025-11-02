import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

export default function Edit( { attributes: { perPage }, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'discogs-collection',
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'marincarroll-discogs/release-template' ],
		templateLock: 'all',
		template: [ [ 'marincarroll-discogs/release-template' ], ['core/query-pagination'] ],
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Display', 'discogs-blocks' ) }>
					<RangeControl
						label={ __( 'Items per page', 'discogs-blocks' ) }
						value={ perPage }
						min={ 1 }
						max={ 100 }
						onChange={ ( nextPerPage ) => {
							setAttributes( { perPage: nextPerPage } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...innerBlocksProps } />
		</>
	);
}
