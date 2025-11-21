import {
	AudioFileIcon,
	CalendarIcon,
	PeopleIcon,
	TitleIcon,
	ICON_FILL,
} from '../../icons';

export default [
	{
		name: 'year',
		title: 'Release Year',
		attributes: {
			type: 'year',
		},
		isDefault: true,
		icon: {
			src: CalendarIcon,
			foreground: ICON_FILL,
		},
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
	{
		name: 'formats',
		title: 'Release Formats',
		attributes: {
			type: 'formats',
		},
		icon: {
			src: AudioFileIcon,
			foreground: ICON_FILL,
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
		icon: {
			src: TitleIcon,
			foreground: ICON_FILL,
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
		icon: {
			src: PeopleIcon,
			foreground: ICON_FILL,
		},
		scope: [ 'inserter', 'transform' ],
		isActive: [ 'type' ],
	},
];
