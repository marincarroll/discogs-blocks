/**
 * WordPress dependencies.
 */
import {registerBlockBindingsSource, registerBlockType} from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';

import './style.scss';

registerBlockBindingsSource( {
	name: 'marincarroll-discogs/release',
	usesContext: [ 'marincarroll-discogs/release' ],
	getValues( { context, bindings } ) {
		const key = bindings.content.args.key;
		let value = context[ 'marincarroll-discogs/release' ][key];

		return {
			content: value.toString(),
		};
	} }
)

registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: () => <InnerBlocks.Content />,
} );
