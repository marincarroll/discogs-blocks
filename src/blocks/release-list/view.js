import { store, getContext } from '@wordpress/interactivity';
import { parseReleaseData, fetchItems } from '../utils';

// TODO see if we can convert this file to TS

const { actions } = store( 'marincarroll/discogs', {
	actions: {
		*fetchPage() {
			const context = getContext();
			const storedPage = context.pages[ context.currentPage ];

			if ( storedPage ) {
				context.items = storedPage;
				return;
			}

			const response = yield fetchItems(context.perPage, context.currentPage);

			/*if ( ! response ) {
				context.items = [];
				return;
			}*/

			context.items = parseReleaseData( response.releases );
			context.pages[ context.currentPage ] = context.items;

			if ( ! context.maxPages ) {
				context.maxPages = parsedResponse.pagination.pages;
			}
		},
	},
} );
