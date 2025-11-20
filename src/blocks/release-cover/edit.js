import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit( {
	context: { 'marincarroll-discogs/release': release },
} ) {
	console.log( release );
	const blockProps = useBlockProps( {
		className: 'discogs-release__cover',
	} );

	return (
		<div { ...blockProps }>
			<img
				src={ release.image }
				alt={ __( 'Cover image', 'discogs-blocks' ) }
			/>
		</div>
	);
}
