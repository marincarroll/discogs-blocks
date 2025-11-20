export default [
	{
		name: 'year',
		title: 'Release Year',
		attributes: {
			type: 'year',
		},
		isDefault: true,
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
	{
		name: 'formats',
		title: 'Release Formats',
		attributes: {
			type: 'formats',
		},
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
	{
		name: 'title',
		title: 'Release Title',
		attributes: {
			type: 'title',
		},
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
	{
		name: 'artists',
		title: 'Release Artists',
		attributes: {
			type: 'artists',
		},
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
];
