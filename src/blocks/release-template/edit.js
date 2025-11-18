/**
 * WordPress dependencies.
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseBlockPreview as useBlockPreview,
	BlockContextProvider,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useState, useMemo } from '@wordpress/element';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { parseReleaseData } from '../utils';

const INNER_BLOCKS_TEMPLATE = [
		/*[
			'core/image',
			{
				"metadata": {
					"bindings": {
						"url": {
							"source": "marincarroll-discogs/release",
							"args": {
								"key": "coverImage"
							}
						}
					}
				}
			}
		],*/
		[ 'core/heading',
			{
				"metadata":{
					"bindings":{
						"content": {
							"source": "marincarroll-discogs/release",
							"args": {
								"key": "title"
							}
						}
					}
				},
			} ],
		[ 'core/heading',
			{
				"level": 3,
				"metadata":{
					"bindings":{
						"content": {
							"source": "marincarroll-discogs/release",
							"args": {
								"key": "artists"
							}
						}
					}
				},
			} ],
		[ 'core/paragraph',
			{
				"metadata":{
					"bindings":{
						"content": {
							"source": "marincarroll-discogs/release",
							"args": {
								"key": "year"
							}
						}
					}
				},
			} ],
		[ 'core/paragraph',
			{
				"metadata":{
					"bindings":{
						"content": {
							"source": "marincarroll-discogs/release",
							"args": {
								"key": "formats"
							}
						}
					}
				},
			} ],
	];

export default function Edit( {
	clientId,
	context: { 'marincarroll-discogs/releases': releases },
	__unstableLayoutClassNames,
} ) {
	const blockProps = useBlockProps( {
		className: classnames(
			'discogs-release-template',
			__unstableLayoutClassNames
		),
	} );

	const blockContexts = useMemo( () => {
		if ( releases ) {
			const parsedData = parseReleaseData( releases );
			return parsedData.map( ( release ) => {
				const context = {};
				Object.keys( release ).forEach( ( key ) => {
					context[ `marincarroll-discogs/${ key }` ] = release[ key ];
				} );
				context[ `marincarroll-discogs/release` ] = release;

				return context;
			} );
		}
	}, [ releases ] );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'discogs-release',
		},
		{
			template: INNER_BLOCKS_TEMPLATE,
			__unstableDisableLayoutClassNames: true,
		}
	);

	const innerBlocksData = useSelect(
		( select ) => {
			const { getBlocks } = select( blockEditorStore );
			return getBlocks( clientId );
		},
		[ clientId ]
	);

	const [ selectedIndex, setSelectedIndex ] = useState( 0 );

	return (
		<ul { ...blockProps }>
			{ blockContexts?.map( ( item, index ) => {
				const handleOnClick = () => setSelectedIndex( index );

				return (
					<BlockContextProvider key={ index } value={ item }>
						{ index === selectedIndex ? (
							<li { ...innerBlocksProps } key="selected" />
						) : (
							<ReleaseBlockPreview
								blocks={ innerBlocksData }
								handleOnClick={ handleOnClick }
								index={ index }
							/>
						) }
					</BlockContextProvider>
				);
			} ) }
		</ul>
	);
}

// TODO memoize to prevent flash, imitating core/query
function ReleaseBlockPreview( { blocks, handleOnClick, index } ) {
	const blockPreviewProps = useBlockPreview( {
		blocks,
		props: {
			className: 'discogs-release',
		},
	} );

	return (
		<li
			{ ...blockPreviewProps }
			key={ index }
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			role="button"
			onClick={ handleOnClick }
			onKeyDown={ handleOnClick }
		/>
	);
}
