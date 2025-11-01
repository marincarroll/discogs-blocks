import apiFetch from '@wordpress/api-fetch';
import { DiscogsItem } from './class-discogs-item';

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
		console.log( releases );
		this.items.forEach( ( item, index ) => {
			const release = releases[ index ];
			if ( release ) {
				new DiscogsItem( item, release.basic_information );
			} else {
				item.remove();
			}
		} );
	}
}
