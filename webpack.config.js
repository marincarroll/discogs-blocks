const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { getProjectSourcePath } = require( '@wordpress/scripts/utils' );

const ENTRYPOINTS = [
	//'options-page'
];

const getAdditionalEntries = () => {
	return ENTRYPOINTS.reduce((accumulator, entrypoint)=> {
		accumulator[entrypoint] = `./${getProjectSourcePath()}/${entrypoint}`;
		return accumulator;
	}, {})
}

module.exports = {
	...defaultConfig,
	//context: path.resolve( __dirname, getProjectSourcePath() ),
	entry: {
		...defaultConfig.entry(),
		...getAdditionalEntries()
	}
};
