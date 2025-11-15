import {
	store,
	getContext,
	getElement,
	useEffect,
	useWatch,
} from '@wordpress/interactivity';
// TODO see if we can convert this file to TS
// Workaround to use wp-api-fetch and wp-url (not modules) in this script (yes a module).
// See https://make.wordpress.org/core/2024/03/04/script-modules-in-6-5/#:~:text=There%20is%20a,apiFetch%20%7D%20%3D%20window.wp
const { apiFetch } = window.wp;
const { addQueryArgs } = window.wp.url;
const { min, max } = Math;

const { state } = store( 'marincarroll/discogs', {
	actions: {
		*load( arrayLike ) {
			const context = getContext();

			const response = yield fetchItems(
				context.perPage,
				context.currentPage
			);
			const { releases, pagination } = JSON.parse( response );
			context.items = parseReleaseData( releases );
			context.pagination = pagination;
		},
		setPage() {
			const context = getContext();
			context.currentPage = context.item;
		},
	},
	callbacks: {
		// This is not in the spirit of Preact, but not sure how else to handle the ellipses...
		buildPaginationButtons() {
			useWatch( () => {
				const { ref } = getElement();
				const context = getContext();
				if ( ! context.pagination ) {
					return;
				}

				ref.innerHTML = '';
				const pageNumbers = getPageNumbers( context.pagination );

				pageNumbers.forEach( ( pageNumber ) => {
					let item = document.createElement( 'li' );
					if ( Number.isInteger( pageNumber ) ) {
						const button = document.createElement( 'button' );
						const isCurrent =
							pageNumber === context.pagination.page;

						button.innerText = pageNumber;
						button.onclick = () =>
							( context.currentPage = pageNumber );
						button.className = '';
						button.disabled = isCurrent;
						button.ariaCurrent = isCurrent.toString();
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
	},
} );

function getPageNumbers( pagination ) {
	const { page, pages } = pagination;
	if ( pages === 1 ) {
		return;
	}
	const ellipsis = '...';
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
