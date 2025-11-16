import {
	store,
	getContext,
	getElement,
	useWatch,
} from '@wordpress/interactivity';
import { parseReleaseData, fetchItems, getPageNumbers } from "./utils";

// TODO see if we can convert this file to TS

const { callbacks, actions } = store( 'marincarroll/discogs', {
	actions: {
		init() {
			const context = getContext();

			actions.fetchPage().then( ( parsedResponse ) => {
				context.maxPages = parsedResponse.pagination.pages;
			} );
		},
		*fetchPage() {
			const context = getContext();
			const storedPage = context.pages[ context.currentPage ];

			if ( storedPage ) {
				context.items = storedPage;
				return;
			}

			const response = yield fetchItems(
				context.perPage,
				context.currentPage
			);
			const parsedResponse = JSON.parse( response );

			context.items = parseReleaseData( parsedResponse.releases );
			context.pages[ context.currentPage ] = context.items;

			return parsedResponse;
		},
	},
	callbacks: {
		// This is not in the spirit of Preact, but not sure how else to handle the ellipses...
		buildPaginationButtons() {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useWatch( () => {
				const { ref } = getElement();
				const context = getContext();

				ref.innerHTML = '';
				const pageNumbers = getPageNumbers(
					context.currentPage,
					context.maxPages
				);

				pageNumbers.forEach( ( pageNumber ) => {
					const item = document.createElement( 'li' );
					if ( Number.isInteger( pageNumber ) ) {
						const button =
							callbacks.buildPaginationButton( pageNumber );
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
		buildPaginationButton( pageNumber ) {
			const context = getContext();

			const button = document.createElement( 'button' );
			const isCurrent = pageNumber === context.currentPage;

			button.innerText = pageNumber;
			button.onclick = () => {
				context.currentPage = pageNumber;
			};
			button.disabled = isCurrent;
			button.ariaCurrent = isCurrent.toString();

			return button;
		},
	},
} );
