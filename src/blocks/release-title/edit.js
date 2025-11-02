import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'discogs-collection__release-title',
	} );

	return (
		<h2 { ...blockProps }>Release Title</h2>
	);
}
