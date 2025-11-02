import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'discogs-release__formats',
	} );

	return <p { ...blockProps }>Release Formats</p>;
}
