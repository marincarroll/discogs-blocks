/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

const { addEntities } = dispatch( coreStore );
addEntities( [
	{
	//	label: __( 'Your Custom Entity Label', 'discogs-blocks' ), // Display name in tools
		name: 'collection-releases',
		kind: 'marincarroll/v1',
		baseURL: 'marincarroll/v1/discogs/collection/releases',
	},
	{
	//	label: __( 'Your Custom Entity Label', 'discogs-blocks' ), // Display name in tools
		name: 'wants-releases',
		kind: 'marincarroll/v1',
		baseURL: 'marincarroll/v1/discogs/wants/releases',
	},
] );

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import variations from './variations';

registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	variations,
} );
