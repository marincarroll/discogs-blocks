import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	BlockPreview,
	__experimentalUseBlockPreview as useBlockPreview,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';

export default function Edit( {
	clientId,
	context: { 'marincarroll-discogs/perPage': perPage },
} ) {
	const blockProps = useBlockProps( {
		className: 'discogs-release-template',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{},
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

	const blockPreviewProps = useBlockPreview(
		{ blocks: innerBlocksData },
		{
			className: 'discogs-release',
		}
	);

	const [ selectedIndex, setSelectedIndex ] = useState( 0 );

	return (
		<ul { ...blockProps }>
			{ [ ...Array( perPage ) ].map( ( item, index ) => {
				if ( index === selectedIndex ) {
					return <li { ...innerBlocksProps } key={ index } />;
				}
				return (
					<li
						{ ...blockPreviewProps }
						key={ index }
						onClick={ () => setSelectedIndex( index ) }
					/>
				);
			} ) }
		</ul>
	);
}
