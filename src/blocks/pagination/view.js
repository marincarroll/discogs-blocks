import {
	store,
	getContext,
	getElement,
	useWatch,
} from '@wordpress/interactivity';
import { getPageNumbers } from '../utils';

// TODO see if we can convert this file to TS

const { callbacks } = store( 'marincarroll/discogs', {
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
						ellipse.className = 'discogs-pagination__ellipse';
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
			button.className = 'discogs-pagination__button';
			button.disabled = isCurrent;
			button.ariaCurrent = isCurrent.toString();

			return button;
		},
	},
} );
