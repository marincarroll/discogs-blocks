import { ICON_FILL, CollectionIcon, HeartIcon } from '../../icons';

export default [
	{
		name: 'collection',
		title: 'Collection',
		attributes: {
			type: 'collection',
		},
		icon: {
			src: CollectionIcon,
			foreground: ICON_FILL,
		},
		isDefault: true,
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
	{
		name: 'wants',
		title: 'Wantlist',
		attributes: {
			type: 'wants',
		},
		icon: {
			src: HeartIcon,
			foreground: ICON_FILL,
		},
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
];
