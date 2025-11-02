export class DiscogsRelease {
	element;
	link;
	data;
	artistHeading;
	titleHeading;
	imageWrapper;
	detailsWrapper;

	constructor( element, data ) {
		this.element = element;
		this.data = data;
		this.imageWrapper = element.querySelector(
			'.discogs-collection__image'
		);
		this.detailsWrapper = element.querySelector(
			'.discogs-collection__details'
		);
		this.artistHeading = element.querySelector(
			'.discogs-collection__artists'
		);
		this.titleHeading = element.querySelector(
			'.discogs-release__title'
		);

		this.load();
	}

	load() {
		this.titleHeading.innerText = this.data.title;
		//this.loadArtists();
		//this.loadDetails();
		this.element.classList.remove( 'placeholder' );

		//this.appendImage();
	}

	loadDetails() {
		const yearText = document.createElement( 'p' );
		yearText.innerText = this.data.year;
		this.detailsWrapper.append( yearText );

		const styleText = document.createElement( 'p' );
		styleText.innerText = this.data.styles.join( ', ' );
		this.detailsWrapper.append( styleText );

		const formatText = document.createElement( 'p' );
		const formats = new Set(
			this.data.formats.map( ( format ) => format.name )
		);
		formatText.innerText = Array.from( formats ).join( ',' );
	}

	loadArtists() {
		// Avoids duplicate artists
		const artistNames = new Set(
			this.data.artists.map( ( artist ) => artist.name )
		);
		this.artistHeading.innerText = Array.from( artistNames ).join( ',' );
	}

	appendImage() {
		const image = document.createElement( 'img' );
		image.src = this.data.cover_image;
		this.imageWrapper.append( image );
	}
}
