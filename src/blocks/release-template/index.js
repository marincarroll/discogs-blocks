/**
 * WordPress dependencies.
 */
import {
	registerBlockBindingsSource,
	registerBlockType,
} from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import { ICON_FILL, MusicNoteIcon } from '../../icons';

import './style.scss';

registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	icon: {
		src: MusicNoteIcon,
		foreground: ICON_FILL,
	},
} );
