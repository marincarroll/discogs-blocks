import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( {
	context: { 'marincarroll-discogs/artists': artists },
} ) {
	const blockProps = useBlockProps( {
		className: 'discogs-release__artist',
	} );

	return <h3 { ...blockProps }>{ artists }</h3>;
}
