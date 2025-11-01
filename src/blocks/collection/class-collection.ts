import apiFetch from '@wordpress/api-fetch';

export class DiscogsCollection {
	element: HTMLElement;
	items: HTMLCollection;

	constructor( element ) {
		this.element = element;
		this.items = element.querySelectorAll( '.discogs-collection__item' );

		apiFetch( { path: 'marincarroll/v1/discogs/collection' } ).then(
			( response ) => {
				const data = JSON.parse( response );
				const releases = data.releases;

				this.items.forEach( ( item, index ) => {
					item.querySelector( 'h2' ).innerText =
						releases[ index ].basic_information.title;
				} );
			}
		);
	}
}
