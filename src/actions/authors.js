import {normalize} from 'normalizr';
import fetchAuthors from '../api/authors';
import * as authors from '../schemas/authors';
import * as books from '../schemas/books';
import {booksRecieve} from './books';

authors.author.define({
	books: books.arrayOfBooks
});

export const FETCH_AUTHORS_REQUEST = 'fetch_authors_request';
const authorsRequest = () => {
	return {
		type: FETCH_AUTHORS_REQUEST
	};
};

export const FETCH_AUTHORS_SUCCESS = 'fetch_authors_success';
export const authorsRecieve = (response) => {
	return {
		type: FETCH_AUTHORS_SUCCESS,
		response
	};
};

export const AUTHORS_TOTAL = 'authors_total';
const authorsTotal = (total) => {
	return {
		type: AUTHORS_TOTAL,
		total
	};
};

export const AUTHORS_FILLED = 'authors_filled';
const authorsFilled = (response) => {
	return {
		type: AUTHORS_FILLED,
		response
	};
};

const shouldFetchAuthors = (state, id) => {
	const byFilled = state.authors.byFilled;

	if (id) {
		return byFilled.indexOf(id.toString()) === -1;
	}

	return byFilled.length < state.authors.total;
};

export const fetchAuthorsIfNeeded = (authorId) => {
	return (dispatch, getState) => {
		if (shouldFetchAuthors(getState(), authorId)) {
			dispatch(authorsRequest());
			
			fetchAuthors(authorId).then(({entities, total}) => {
				const normalized = normalize(entities, authors.arrayOfAuthors);

				dispatch(authorsTotal(total));
				dispatch(authorsFilled(normalized));
				dispatch(authorsRecieve(normalized));
				dispatch(booksRecieve(normalized));
			});
		}
	};
};