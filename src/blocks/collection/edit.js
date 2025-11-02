import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

export default function Edit( { attributes: { perPage }, setAttributes } ) {
	return (
		<section { ...useBlockProps( { className: 'discogs-collection' } ) }>
			<InspectorControls>
				<PanelBody title={ __( 'Display', 'discogs-blocks' ) }>
					<RangeControl
						label={ __( 'Items per page', 'discogs-blocks' ) }
						value={ perPage }
						min={ 1 }
						max={ 100 }
						onChange={ ( nextPerPage ) => {
							setAttributes( { perPage: nextPerPage } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			{ [ ...Array( perPage ) ].map( ( e, i ) => (
				<div className="discogs-collection__item placeholder" key={ i }>
					<div className="discogs-collection__image"></div>
					<h2 className="discogs-collection__title"></h2>
					<h3 className="discogs-collection__artists"></h3>
					<div className="discogs-collection__details"></div>
				</div>
			) ) }
		</section>
	);
}
