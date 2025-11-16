import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseBlockPreview as useBlockPreview,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

export default function Edit( {
	clientId,
	context: { 'marincarroll-discogs/perPage': perPage },
} ) {
	const blockProps = useBlockProps( {
		className: 'discogs-release-template',
	} );

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

	const blockPreviewProps = useBlockPreview( {
		blocks: innerBlocksData,
		props: {
			className: 'discogs-release',
		},
	} );

	const [ selectedIndex, setSelectedIndex ] = useState( 0 );

	return (
		<ul { ...blockProps }>
			{ [ ...Array( perPage ) ].map( ( item, index ) => {
				if ( index === selectedIndex ) {
					return <li { ...innerBlocksProps } key="selected" />;
				}
				const handleOnClick = () => setSelectedIndex( index );

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
			} ) }
		</ul>
	);
}
