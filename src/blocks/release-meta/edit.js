import {
	useBlockProps,
	HeadingLevelDropdown,
	BlockControls,
} from '@wordpress/block-editor';

export default function Edit( {
	context: { 'marincarroll-discogs/release': release },
	attributes: { type, level },
	setAttributes,
} ) {
	const blockProps = useBlockProps( {
		className: 'discogs-release__meta',
	} );

	const TagName = level === 0 ? 'p' : `h${ level }`;

	return (
		<>
			<BlockControls group="block">
				<HeadingLevelDropdown
					options={ [ 0, 1, 2, 3, 4, 5, 6 ] /* 0 = paragraph */ }
					value={ level }
					onChange={ ( nextLevel ) => {
						setAttributes( { level: nextLevel } );
					} }
				/>
			</BlockControls>
			<TagName { ...blockProps }>{ release[ type ] }</TagName>
		</>
	);
}
