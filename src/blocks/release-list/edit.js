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
import { useEntityRecords } from '@wordpress/core-data';

/**
 * Internal dependencies.
 */
import { parseReleaseData } from '../utils';

export default function Edit( {
	attributes: { perPage, type },
	setAttributes,
} ) {
	const { records: releaseData } = useEntityRecords(
		'marincarroll/v1',
		type + '-releases',
		{ perPage }
	);

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
			{ releaseData ? (
				<BlockContextProvider
					value={ {
						'marincarroll-discogs/releases':
							parseReleaseData( releaseData ),
					} }
				>
					<section { ...innerBlocksProps } />
				</BlockContextProvider>
			) : __(
				'No Discogs Collection found. Please ensure you have entered a valid Personal Access Token in Settings > Discogs Blocks.',
				'nunews-blocks'
			) }
		</>
	);
}
