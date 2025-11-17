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
import { useState, useEffect, useMemo } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { parseReleaseData } from '../utils';


export default function Edit( {
	clientId,
	context: { 'marincarroll-discogs/releases': releases },
} ) {
	console.log(releases);
	const blockProps = useBlockProps( {
		className: 'discogs-release-template',
	} );

	const blockContexts = useMemo( () => {
		if ( releases ) {
			const parsedData = parseReleaseData( releases );
			return parsedData.map( ( release ) => {
				const context = {};
				Object.keys( release ).forEach( ( key ) => {
					context[ `marincarroll-discogs/${ key }` ] = release[ key ];
				} );

				return context;
			} );
		}
	}, [ releases ] );

	/*const pageNumbers = useMemo( () => {
		if ( data?.pagination?.pages ) {
			return getPageNumbers( 1, data.pagination.pages );
		}
	}, [ data ] );*/

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'discogs-release',
		},
		{
			template: [
				[ 'marincarroll-discogs/release-cover' ],
				[ 'marincarroll-discogs/release-title' ],
				[ 'marincarroll-discogs/release-artists' ],
				[ 'marincarroll-discogs/release-year' ],
				[ 'marincarroll-discogs/release-formats' ],
			],
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
		<div { ...blockProps }>
			<ul>
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
			{ /*pageNumbers && (
				<nav className="discogs-pagination">
					<ul>
						{ pageNumbers.map( ( pageNumber, index ) => {
							const className = `discogs-pagination__${
								Number.isInteger( pageNumber )
									? 'button'
									: 'ellipse'
							}`;
							return (
								<li key={ index }>
									<span
										className={ className }
										aria-current={ index === 0 }
									>
										{ pageNumber }
									</span>
								</li>
							);
						} ) }
					</ul>
				</nav>
			)*/ }
		</div>
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
