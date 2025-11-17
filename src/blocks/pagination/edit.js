/**
 * WordPress dependencies.
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { getPageNumbers } from '../utils';

export default function Edit( { __unstableLayoutClassNames } ) {
	const blockProps = useBlockProps( {
		className: classnames( 'discogs-pagination' ),
	} );

	return (
		<nav { ...blockProps }>
			<ul className={ __unstableLayoutClassNames }>
				{ getPageNumbers( 1, 12 ).map( ( pageNumber, index ) => {
					const className = `discogs-pagination__${
						Number.isInteger( pageNumber ) ? 'button' : 'ellipse'
					}`;
					return (
						<li key={ index }>
							<span
								className={ className }
								aria-current={ index === 0 }
							>
								{ pageNumber }
							</span>
						</li>
					);
				} ) }
			</ul>
		</nav>
	);
}
