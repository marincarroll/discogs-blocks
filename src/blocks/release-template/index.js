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

registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: () => <InnerBlocks.Content />,
} );

registerBlockBindingsSource( {
	name: 'marincarroll-discogs/release-alt',
	getValues() {
		return {
			alt: __('Cover image', 'discogs-blocks'),
		};
	} }
)

registerBlockBindingsSource( {
	name: 'marincarroll-discogs/release-image',
	usesContext: [ 'marincarroll-discogs/release' ],
	getValues( { context } ) {
		return {
			url: context[ 'marincarroll-discogs/release' ].image,
		};
	} }
)


registerBlockBindingsSource( {
	name: 'marincarroll-discogs/release-artists',
	usesContext: [ 'marincarroll-discogs/release' ],
	getValues( { context } ) {
		return {
			content: context[ 'marincarroll-discogs/release' ].artists,
		};
	} }
)

registerBlockBindingsSource( {
	name: 'marincarroll-discogs/release-formats',
	usesContext: [ 'marincarroll-discogs/release' ],
	getValues( { context } ) {
		return {
			content: context[ 'marincarroll-discogs/release' ].formats,
		};
	} }
)

registerBlockBindingsSource( {
	name: 'marincarroll-discogs/release-year',
	usesContext: [ 'marincarroll-discogs/release' ],
	getValues( { context } ) {
		const year = context[ 'marincarroll-discogs/release' ].year;

		return {
			content: year.toString(),
		};
	} }
)

registerBlockBindingsSource( {
	name: 'marincarroll-discogs/release-title',
	usesContext: [ 'marincarroll-discogs/release' ],
	getValues( { context } ) {
		return {
			content: context[ 'marincarroll-discogs/release' ].title,
		};
	} }
)
