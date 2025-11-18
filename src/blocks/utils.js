// TODO see if we can convert this file to TS
// Workaround to use wp-api-fetch and wp-url (not modules) in this script (yes a module).
// See https://make.wordpress.org/core/2024/03/04/script-modules-in-6-5/#:~:text=There%20is%20a,apiFetch%20%7D%20%3D%20window.wp
const { apiFetch } = window.wp;
const { addQueryArgs } = window.wp.url;

const { min, max } = Math;

export function getPageNumbers( page, pages ) {
	const ellipsis = '...'; // todo real ellipsis
	const range = ( lo, hi ) =>
		Array.from( { length: hi - lo }, ( _, i ) => i + lo );
	const start = max( 1, min( page - 1, pages - 3 ) );
	const end = min( pages, max( page + 1, 4 ) );
	const pageNumbers = [];
	if ( start > 1 ) {
		pageNumbers.push( 1 );
	}

	if ( start > 2 ) {
		pageNumbers.push( ellipsis );
	}

	pageNumbers.push( ...range( start, end + 1 ) );

	if ( end < pages - 1 ) {
		pageNumbers.push( ellipsis );
	}

	if ( end < pages ) {
		pageNumbers.push( pages );
	}

	return pageNumbers;
}

export function parseReleaseData( releases ) {
	return releases.map( ( release ) => {
		const {
			year,
			title,
			artists,
			formats,
			cover_image: image,
		} = release.basic_information;

		return {
			title,
			year,
			formats: arrayToString( formats ),
			artists: arrayToString( artists ),
			image,
		};
	} );
}

function arrayToString( array ) {
	const uniqueItems = new Set( array.map( ( item ) => item.name ) );
	return Array.from( uniqueItems ).join( ', ' );
}

export function fetchItems( perPage, page ) {
	const path = addQueryArgs( 'marincarroll/v1/discogs/collection', {
		perPage,
		page,
	} );

	return apiFetch( { path } );
}
