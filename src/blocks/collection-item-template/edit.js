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
		className: 'discogs-collection__item-template',
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: [
				[ 'core/heading' ],
				[ 'core/heading' ],
				[ 'core/paragraph' ],
				[ 'core/paragraph' ],
			],
		}
	);

	// TODO how to make performant??
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
			className: 'discogs-collection__item',
		}
	);

	const [ selectedIndex, setSelectedIndex ] = useState( 0 );

	return (
		<ul { ...blockProps }>
			{ [ ...Array( perPage ) ].map( ( item, index ) => {
				if ( index === selectedIndex ) {
					return <li { ...innerBlocksProps } />;
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
