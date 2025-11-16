import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( {
	context: { 'marincarroll-discogs/formats': formats },
} ) {
	const blockProps = useBlockProps( {
		className: 'discogs-release__formats',
	} );

	return <p { ...blockProps }>{ formats }</p>;
}
