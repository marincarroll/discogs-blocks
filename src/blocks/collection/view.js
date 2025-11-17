import { store, getContext } from '@wordpress/interactivity';
import { parseReleaseData, fetchItems } from '../utils';

// TODO see if we can convert this file to TS

const { actions } = store( 'marincarroll/discogs', {
	actions: {
		*init() {
			const context = getContext();

			const parsedResponse = yield actions.fetchPage();
			if ( parsedResponse ) {
				context.maxPages = parsedResponse.pagination.pages;
			}
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
			if ( ! response ) {
				context.items = [];
				return;
			}
			const parsedResponse = JSON.parse( response );

			context.items = parseReleaseData( parsedResponse.releases );
			context.pages[ context.currentPage ] = context.items;

			return parsedResponse;
		},
	},
} );
