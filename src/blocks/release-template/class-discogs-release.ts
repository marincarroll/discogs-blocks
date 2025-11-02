export class DiscogsRelease {
	element;
	link;
	data;
	cover;
	coverImage;
	artistsHeading;
	titleHeading;
	formatsText;
	yearText;

	constructor( element ) {
		this.element = element;
		this.cover = element.querySelector( '.discogs-release__cover' );
		this.artistsHeading = element.querySelector(
			'.discogs-release__artists'
		);
		this.titleHeading = element.querySelector( '.discogs-release__title' );
		this.formatsText = element.querySelector( '.discogs-release__formats' );
		this.yearText = element.querySelector( '.discogs-release__year' );
	}

	load( data ) {
		console.log(data);
		this.titleHeading.innerText = data.title;
		this.yearText.innerText = data.year;
		this.loadArtists(data.artists);
		this.loadFormats(data.formats);

		this.element.classList.remove( 'placeholder' );

		this.loadCover(data.cover_image);
	}

	loadFormats(formats) {
		const formatNames = new Set(
			formats.map( ( format ) => format.name )
		);
		this.formatsText.innerText = Array.from( formatNames ).join( ', ' );
	}

	loadArtists(artists) {
		// Avoids duplicate artists
		const artistNames = new Set(
			artists.map( ( artist ) => artist.name )
		);
		this.artistsHeading.innerText = Array.from( artistNames ).join( ',' );
	}

	loadCover( coverImageSrc ) {
		if( ! this.cover.hasChildNodes() ) {
			this.coverImage = document.createElement( 'img' );
			this.cover.append( this.coverImage );
		}
		this.coverImage.src = coverImageSrc;
	}
}
