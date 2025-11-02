import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	BlockPreview,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit( {
	attributes: { perPage },
	setAttributes,
	clientId,
} ) {
	const blockProps = useBlockProps( {
		className: 'discogs-collection__item',
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: [ 'marincarroll-discogs/collection-item-template' ],
			templateLock: 'all',
			template: [ [ 'marincarroll-discogs/collection-item-template' ] ],
		}
	);

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
