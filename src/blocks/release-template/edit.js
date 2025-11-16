import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseBlockPreview as useBlockPreview, BlockContextProvider,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useState, useEffect,useMemo } from '@wordpress/element';
import {fetchItems, parseReleaseData} from "./utils";

export default function Edit( {
	clientId,
	context: { 'marincarroll-discogs/perPage': perPage },
} ) {
	const blockProps = useBlockProps( {
		className: 'discogs-release-template',
	} );

	const [ data, setData ] = useState();
	useEffect(()=> {
		fetchItems(perPage, 1).then(response => {
			const parsedResponse = JSON.parse(response);
			setData(parsedResponse);
		});
	},[perPage]);

	const parsedReleaseData = useMemo(() => {
		if( data?.releases ) {
			return parseReleaseData(data.releases);
		}
	}, [data])

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
				{ parsedReleaseData?.map( ( item, index ) => {
					const handleOnClick = () => setSelectedIndex( index );

					return (
						<BlockContextProvider key={index} value={item}>
							{  index === selectedIndex
								 ? <li { ...innerBlocksProps } key="selected" />
								: <ReleaseBlockPreview
									blocks={innerBlocksData}
									handleOnClick={handleOnClick}
									index={index}
								/>
							}
						</BlockContextProvider>
					);
				} ) }
			</ul>
		</div>
	);
}

function ReleaseBlockPreview({ blocks, handleOnClick, index }) {
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
	)
}
