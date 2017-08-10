import {combineReducers} from 'redux';

import books from './books';
import genres from './genres';
import authors from './authors';

export default (router) => combineReducers({
	books,
	genres,
	authors,
	router
});