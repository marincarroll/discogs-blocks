import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'discogs-release__artist',
	} );

	return <h3 { ...blockProps }>Release Artist</h3>;
}
