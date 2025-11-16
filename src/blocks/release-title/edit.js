import { useBlockProps } from '@wordpress/block-editor';

export default function Edit({
	 context: { 'marincarroll-discogs/title': title },
}) {
	const blockProps = useBlockProps( {
		className: 'discogs-release__title',
	} );

	return <h2 { ...blockProps }>{ title }</h2>;
}
