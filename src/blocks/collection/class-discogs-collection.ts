import apiFetch from '@wordpress/api-fetch';
import { DiscogsRelease } from '../release-template/class-discogs-release';

export class DiscogsCollection {
	element: HTMLElement;
	items: NodeListOf< HTMLElement >;
	pagination: HTMLElement;
	collectionData;
	releases: Array<DiscogsRelease> = [];
	perPage: number;
	page: number = 1;

	constructor( element ) {
		this.element = element;
		this.items = element.querySelectorAll( '.discogs-release' );
		this.pagination = element.querySelector('.discogs-collection__pagination');
		this.perPage = element.dataset.perPage;

		this.init();
	}

	fetchCollections() {
		//TODO use wp-url utilities
		return apiFetch( { path: `marincarroll/v1/discogs/collection?perPage=${this.perPage}&page=${this.page}` } ).then(
			( response ) => {
				this.collectionData = JSON.parse( < string >response );
				this.loadItems();
			}
		);
	}

	loadPagination(pages) {
		for(let pageNum= 1; pageNum <= pages; pageNum++) {
			const button = document.createElement('button');
			button.innerText = pageNum.toString();
			button.ariaLabel = `Go to page ${pageNum}`;  // TODO i18n
			button.onclick = () => {
				this.page = pageNum;
				this.fetchCollections().then(() => {
					button.ariaCurrent = 'true';
				});
			}
			this.pagination.appendChild(button);
		}
	}

	init() {
		this.items.forEach( ( item, index ) => {
			this.releases[index] = new DiscogsRelease( item );
		} );

		this.fetchCollections().then(() =>{
			const { pagination } = this.collectionData;
			if( pagination.pages > 1 ) {
				this.loadPagination( pagination.pages );
			} else {
				this.pagination.remove();
			}
		});
	}

	loadItems() {
		this.items.forEach( ( item, index ) => {
			const releaseData = this.collectionData.releases[ index ];
			if ( releaseData ) {
				this.releases[ index ].load( releaseData.basic_information );
			} else {
				item.remove();
			}
		} );
	}
}
