import { store, getContext, getElement } from '@wordpress/interactivity';
// TODO see if we can convert this file to TS
// Workaround to use wp-api-fetch and wp-url (not modules) in this script (yes a module).
// See https://make.wordpress.org/core/2024/03/04/script-modules-in-6-5/#:~:text=There%20is%20a,apiFetch%20%7D%20%3D%20window.wp
const { apiFetch } = window.wp;
const { addQueryArgs } = window.wp.url;

const {state} = store( 'marincarroll/discogs', {
	state: {
		currentPage: 1,
		get isCurrentPage() {
			const { currentPage } = state;
			const { ref } = getElement();
			const isCurrent = parseInt( ref.innerText ) === currentPage;
			ref.ariaCurrent = isCurrent; // For some reason I'm not allowed to bind this w/wp-interactivity
			return isCurrent;
		}
	},
	actions: {
		* load(arrayLike) {
			const context = getContext();
			const response = yield fetchItems( context.perPage, state.currentPage );
			const { releases, pagination } = JSON.parse( response );

			context.items = parseReleaseData(releases);
			if( pagination.pages > 1 ) {
				context.pagination = Array.from({length: pagination.pages}, (_, i) => i + 1)
			}
		},
		setPage() {
			const context = getContext();
			state.currentPage = context.item;
		}
	},
} );


function parseReleaseData( releases ) {
	return releases.map( ( release ) => {
		const {
			year,
			title,
			artists,
			formats,
			cover_image: coverImage,
		} = release.basic_information;

		return {
			title,
			year,
			formats: arrayToString( formats ),
			artists: arrayToString( artists ),
			coverImage,
		};
	} );
}

function arrayToString( array ) {
	const uniqueItems = new Set( array.map( ( item ) => item.name ) );
	return Array.from( uniqueItems ).join( ', ' );
}

function fetchItems( perPage, page ) {
	const path = addQueryArgs( 'marincarroll/v1/discogs/collection', {
		perPage,
		page,
	} );

	return apiFetch( { path } );
}
