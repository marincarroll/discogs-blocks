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

/**
 * Internal dependencies.
 */
import { parseReleaseData } from '../utils';
import { useSelect } from '@wordpress/data';

export default function Edit( { attributes: { perPage }, setAttributes } ) {
	const releaseData = useSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		return getEntityRecords( 'marincarroll/v1', 'collection-releases' );
	}, [] );

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

	if ( ! releaseData ) {
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
					'marincarroll-discogs/releases':
						parseReleaseData( releaseData ),
				} }
			>
				<section { ...innerBlocksProps } />
			</BlockContextProvider>
		</>
	);
}
