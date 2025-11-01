/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save() {
	return (
		<section
			{ ...useBlockProps.save( { className: 'discogs-collection' } ) }
		>
			{ [ ...Array( 20 ) ].map( ( e, i ) => (
				<div className="discogs-collection__item" key={ i }>
					<h2>placeholder</h2>
				</div>
			) ) }
		</section>
	);
}
