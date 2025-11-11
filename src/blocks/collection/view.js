import { store, getContext } from '@wordpress/interactivity';
// TODO see if we can convert this file to TS
// Workaround to use wp-api-fetch and wp-url (not modules) in this script (yes a module).
// See https://make.wordpress.org/core/2024/03/04/script-modules-in-6-5/#:~:text=There%20is%20a,apiFetch%20%7D%20%3D%20window.wp
const { apiFetch } = window.wp;
const { addQueryArgs } = window.wp.url;

const collectionStore = store( 'marincarroll/discogs', {
	state: {
		list: 0,
		items: {},
	},
	actions: {
		*load() {
			const context = getContext();
			const response = yield fetchItems(4, 1); //todo
			const {releases, pagination} =  JSON.parse( response );

			context.items = releases.map( (release) => {
				const { year, title } = release.basic_information;
				return { title, year };
			});
		}
	},
} );

function fetchItems(perPage, page) {
	const path = addQueryArgs(
		'marincarroll/v1/discogs/collection',
		{ perPage, page }
	)

	return apiFetch( { path } );
}
