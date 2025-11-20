import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( {
	context: { 'marincarroll-discogs/release': release },
	attributes: { type },
} ) {
	const blockProps = useBlockProps();
	// todo add level/tagname picker
	return <h3 { ...blockProps }>{ release[ type ] }</h3>;
}
