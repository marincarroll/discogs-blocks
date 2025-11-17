import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( {
	context: { 'marincarroll-discogs/year': year },
} ) {
	const blockProps = useBlockProps( {
		className: 'discogs-collection__release-year',
	} );

	return <p { ...blockProps }>{ year }</p>;
}
