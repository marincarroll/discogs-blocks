import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'discogs-collection__release-year',
	} );

	return <p { ...blockProps }>Release Year</p>;
}
