import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit( {
	context: { 'marincarroll-discogs/coverImage': coverImage },
} ) {
	const blockProps = useBlockProps( {
		className: 'discogs-release__cover',
	} );

	return (
		<div { ...blockProps }>
			<img
				src={ coverImage }
				alt={ __( 'Cover image', 'discogs-blocks' ) }
			/>
		</div>
	);
}
