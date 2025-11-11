import { store } from '@wordpress/interactivity';

const myStore = store( 'myCounterPlugin', {
	state: {
		counter: 0,
	},
	actions: {
		increment() {
			myStore.state.counter += 1;
		},
	},
	callbacks: {
		log() {
			console.log( `counter: ${ myStore.state.counter }` );
		},
	},
} );
