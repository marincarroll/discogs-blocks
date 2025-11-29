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
import { useState, useMemo, memo } from '@wordpress/element';

/**
 * External dependencies.
 */
import classnames from 'classnames';

const INNER_BLOCKS_TEMPLATE = [
	[ 'marincarroll-discogs/release-cover' ],
	[ 'marincarroll-discogs/release-meta', { type: 'title' } ],
	[ 'marincarroll-discogs/release-meta', { type: 'artists' } ],
	[
		'core/group',
		{
			layout: {
				type: 'flex',
			},
		},
		[
			[ 'marincarroll-discogs/release-meta', { type: 'formats' } ],
			[ 'marincarroll-discogs/release-meta', { type: 'year' } ],
		],
	],
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
		return releases.map( ( release ) => {
			return { 'marincarroll-discogs/release': release };
		} );
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
						{ index === selectedIndex && (
							<li { ...innerBlocksProps } key="selected" />
						) }
						<MemoizedReleaseBlockPreview
							blocks={ innerBlocksData }
							handleOnClick={ handleOnClick }
							index={ index }
							isHidden={ index === selectedIndex }
						/>
					</BlockContextProvider>
				);
			} ) }
		</ul>
	);
}

// TODO memoize to prevent flash, imitating core/query
function ReleaseBlockPreview( { blocks, handleOnClick, index, isHidden } ) {
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
			style={ { display: isHidden ? 'none' : undefined } }
		/>
	);
}

const MemoizedReleaseBlockPreview = memo(ReleaseBlockPreview);
