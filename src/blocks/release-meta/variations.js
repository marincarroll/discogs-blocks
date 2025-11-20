export default [
	{
		name: 'year',
		title: 'Year',
		attributes: {
			type: 'year',
		},
		isDefault: true,
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
	{
		name: 'formats',
		title: 'Formats',
		attributes: {
			type: 'formats',
		},
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
	{
		name: 'title',
		title: 'Title',
		attributes: {
			type: 'title',
		},
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
	{
		name: 'artists',
		title: 'Artists',
		attributes: {
			type: 'artists',
		},
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
]
