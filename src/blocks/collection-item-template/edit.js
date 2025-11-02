import { __ } from '@wordpress/i18n';
import {useBlockProps, useInnerBlocksProps} from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps( { className: 'discogs-collection__item' } );
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [
			['core/heading'],
			['core/heading'],
			['core/paragraph'],
			['core/paragraph'],
		]
	});
	return (
		<div { ...innerBlocksProps}/>
	);
}
