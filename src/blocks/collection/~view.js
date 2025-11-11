import { DiscogsCollection } from './class-discogs-collection';

document.querySelectorAll( '.discogs-collection' ).forEach( ( block ) => {
	new DiscogsCollection( block );
} );
