import {
	store,
	getContext,
	getElement,
	useWatch,
} from '@wordpress/interactivity';

// TODO see if we can convert this file to TS
// Workaround to use wp-api-fetch and wp-url (not modules) in this script (yes a module).
// See https://make.wordpress.org/core/2024/03/04/script-modules-in-6-5/#:~:text=There%20is%20a,apiFetch%20%7D%20%3D%20window.wp
const { apiFetch } = window.wp;
const { addQueryArgs } = window.wp.url;

const { min, max } = Math;

const { state, callbacks, actions } = store( 'marincarroll/discogs', {
	actions: {
		init() {
			const context = getContext();

			actions.fetchPage().then( (parsedResponse) => {
				context.maxPages = parsedResponse.pagination.pages;
			});
		},
		*fetchPage() {
			const context = getContext();
			const storedPage = context.pages[context.currentPage];

			if( storedPage ) {
				context.items = storedPage;
				return;
			}

			const response = yield fetchItems(context.perPage, context.currentPage);
			const parsedResponse = JSON.parse( response );

			context.items = parseReleaseData( parsedResponse.releases );
			context.pages[context.currentPage] = context.items;

			return parsedResponse;
		},
	},
	callbacks: {
		// This is not in the spirit of Preact, but not sure how else to handle the ellipses...
		buildPaginationButtons() {
			useWatch( () => {
				const { ref } = getElement();
				const context = getContext();

				ref.innerHTML = '';
				const pageNumbers = getPageNumbers( context.currentPage, context.maxPages );

				pageNumbers.forEach( ( pageNumber ) => {
					const item = document.createElement( 'li' );
					if ( Number.isInteger( pageNumber ) ) {
						const button =  callbacks.buildPaginationButton(pageNumber);
						item.appendChild( button );
					} else {
						const ellipse = document.createElement( 'span' );
						ellipse.innerText = pageNumber;
						item.appendChild( ellipse );
					}

					ref.appendChild( item );
				} );
			} );
		},
		buildPaginationButton(pageNumber) {
			const context = getContext();

			const button = document.createElement( 'button' );
			const isCurrent =
				pageNumber === context.currentPage;

			button.innerText = pageNumber;
			button.onclick = () => {
				context.currentPage = pageNumber;
			};
			button.disabled = isCurrent;
			button.ariaCurrent = isCurrent.toString();

			return button;
		}
	},
} );

function getPageNumbers( page, pages ) {
	const ellipsis = '...'; // todo real ellipsis
	const range = ( lo, hi ) =>
		Array.from( { length: hi - lo }, ( _, i ) => i + lo );
	const start = max( 1, min( page - 1, pages - 3 ) );
	const end = min( pages, max( page + 1, 4 ) );
	return [
		...( start > 2 ? [ 1, ellipsis ] : start > 1 ? [ 1 ] : [] ),
		...range( start, end + 1 ),
		...( end < pages - 1
			? [ ellipsis, pages ]
			: end < pages
			? [ pages ]
			: [] ),
	];
}

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
