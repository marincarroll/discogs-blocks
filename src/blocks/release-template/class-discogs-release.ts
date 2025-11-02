export class DiscogsRelease {
	element;
	link;
	data;
	artistsHeading;
	titleHeading;
	imageWrapper;
	formatsText;
	yearText;

	constructor( element, data ) {
		this.element = element;
		this.data = data;
		/*this.imageWrapper = element.querySelector(
			'.discogs-collection__image'
		);*/
		this.artistsHeading = element.querySelector( '.discogs-release__artists' );
		this.titleHeading = element.querySelector( '.discogs-release__title' );
		this.formatsText = element.querySelector('.discogs-release__formats');
		this.yearText = element.querySelector('.discogs-release__year');
		
		this.load();
	}

	load() {
		this.titleHeading.innerText = this.data.title;
		this.yearText.innerText = this.data.year;
		this.loadArtists();
		this.loadFormats();

		this.element.classList.remove( 'placeholder' );

		//this.appendImage();
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

	appendImage() {
		const image = document.createElement( 'img' );
		image.src = this.data.cover_image;
		this.imageWrapper.append( image );
	}
}
