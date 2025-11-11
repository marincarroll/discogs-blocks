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
	pageTemplates: Array<NodeListOf< HTMLElement >>;
	template: HTMLElement;
	itemsShown: number;
	wrapper: HTMLElement;

	constructor( element ) {
		this.element = element;
		this.template = element.querySelector('.discogs-release');
		this.wrapper = element.querySelector('.discogs-release-template');
		this.pagination = element.querySelector('.discogs-collection__pagination');
		this.perPage = element.dataset.perPage;

		this.init();
	}

	fetchCollections() {
		//TODO use wp-url utilities
		return apiFetch( { path: `marincarroll/v1/discogs/collection?perPage=${this.perPage}&page=${this.page}` } ).then(
			( response ) => {

				this.collectionData = JSON.parse( < string >response );
				if( this.pageTemplates[this.collectionData.pagination.page]) {
					//already loaded
				} else {
					this.loadItems();
				}
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
		this.fetchCollections().then(() =>{
			const { items, per_page: perPage, page, pages } = this.collectionData.pagination;
			this.itemsShown = page === pages ? items % perPage : perPage;
			
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
				//item.remove();
			}
		} );
	}
}
