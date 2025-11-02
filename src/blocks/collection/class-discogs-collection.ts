import apiFetch from '@wordpress/api-fetch';
import { DiscogsRelease } from '../release-template/class-discogs-release';

export class DiscogsCollection {
	element: HTMLElement;
	items: NodeListOf< HTMLElement >;
	collectionData;

	constructor( element ) {
		this.element = element;
		this.items = element.querySelectorAll( '.discogs-release' );

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
				new DiscogsRelease( item, release.basic_information );
			} else {
				item.remove();
			}
		} );
	}
}
