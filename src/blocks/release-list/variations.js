export default [
	{
		name: 'collection',
		title: 'Collection',
		attributes: {
			type: 'collection',
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
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
];
