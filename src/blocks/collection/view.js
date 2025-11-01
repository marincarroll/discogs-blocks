import { DiscogsCollection } from './class-collection';

document.querySelectorAll( '.discogs-collection' ).forEach( ( block ) => {
	new DiscogsCollection( block );
} );
