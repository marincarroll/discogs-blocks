import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'discogs-release__cover',
	} );

	return <div { ...blockProps } />;
}
