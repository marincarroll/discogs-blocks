export class DiscogsRelease {
	element;
	link;
	data;
	cover;
	artistsHeading;
	titleHeading;
	imageWrapper;
	formatsText;
	yearText;

	constructor( element, data ) {
		this.element = element;
		this.data = data;
		this.cover = element.querySelector( '.discogs-release__cover' );
		this.artistsHeading = element.querySelector(
			'.discogs-release__artists'
		);
		this.titleHeading = element.querySelector( '.discogs-release__title' );
		this.formatsText = element.querySelector( '.discogs-release__formats' );
		this.yearText = element.querySelector( '.discogs-release__year' );

		this.load();
	}

	load() {
		this.titleHeading.innerText = this.data.title;
		this.yearText.innerText = this.data.year;
		this.loadArtists();
		this.loadFormats();

		this.element.classList.remove( 'placeholder' );

		this.appendCover();
	}

	loadFormats() {
		const formats = new Set(
			this.data.formats.map( ( format ) => format.name )
		);
		this.formatsText.innerText = Array.from( formats ).join( ', ' );
	}

	loadArtists() {
		// Avoids duplicate artists
		const artistNames = new Set(
			this.data.artists.map( ( artist ) => artist.name )
		);
		this.artistsHeading.innerText = Array.from( artistNames ).join( ',' );
	}

	appendCover() {
		const image = document.createElement( 'img' );
		image.src = this.data.cover_image;
		this.cover.append( image );
	}
}
