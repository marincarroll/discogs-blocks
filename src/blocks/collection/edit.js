import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<section { ...useBlockProps( { className: 'discogs-collection' } ) }>
			{ [ ...Array( 21 ) ].map( ( e, i ) => (
				<div className="discogs-collection__item" key={ i }>
					<h2>placeholder</h2>
				</div>
			) ) }
		</section>
	);
}
