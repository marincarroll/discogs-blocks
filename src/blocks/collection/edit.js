/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	BlockContextProvider,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { fetchItems } from '../utils';

export default function Edit( { attributes: { perPage }, setAttributes } ) {
	const [ data, setData ] = useState();

	useEffect( () => {
		fetchItems( perPage, 1 ).then( ( response ) => {
			const parsedResponse = JSON.parse( response );
			setData( parsedResponse );
		} );
	}, [ perPage ] );

	const blockProps = useBlockProps( {
		className: 'discogs-collection',
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'marincarroll-discogs/release-template' ],
		templateLock: 'all',
		template: [
			[ 'marincarroll-discogs/release-template' ],
			[ 'marincarroll-discogs/pagination' ],
		],
	} );

	if ( ! data ) {
		return (
			<div { ...blockProps }>
				{ __(
					'No Discogs Collection found. Please ensure you have entered a valid Personal Access Token in Settings > Discogs Blocks.',
					'nunews-blocks'
				) }
			</div>
		);
	}

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
			<BlockContextProvider
				value={ {
					'marincarroll-discogs/releases': data.releases,
				} }
			>
				<section { ...innerBlocksProps } />
			</BlockContextProvider>
		</>
	);
}
