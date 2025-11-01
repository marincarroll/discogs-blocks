import apiFetch from '@wordpress/api-fetch';

export class DiscogsCollection {
	element: HTMLElement;
	items: NodeListOf< HTMLElement >;
	collectionData;

	constructor( element ) {
		this.element = element;
		this.items = element.querySelectorAll( '.discogs-collection__item' );

		this.fetchCollections();
	}

	fetchCollections() {
		apiFetch( { path: 'marincarroll/v1/discogs/collection' } ).then(
			( response ) => {
				this.collectionData = JSON.parse( < string >response );
				this.loadItems();
			}
		);
	}

	loadItems() {
		const releases = this.collectionData.releases;

		this.items.forEach( ( item, index ) => {
			const release = releases[ index ];
			if ( release ) {
				this.loadItem( item, release );
			} else {
				item.remove();
			}
		} );
	}

	loadItem( item, data ) {
		item.querySelector( 'h2' ).innerText = data.basic_information.title;
	}
}
