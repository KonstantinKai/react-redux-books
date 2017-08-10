import {combineReducers} from 'redux';
import uniq from 'lodash/uniq';
import merge from 'lodash/merge';
import {getAllBooks} from './books';
import {
	FETCH_AUTHORS_REQUEST,
	FETCH_AUTHORS_SUCCESS,
	AUTHORS_TOTAL,
	AUTHORS_FILLED
} from '../actions/authors';

const byId = (state = {}, action) => {
	switch (action.type) {
		case FETCH_AUTHORS_SUCCESS:
			return merge({}, state, action.response.entities.authors);
		default:
			return state;
	}
};

const byFilled = (state = [], action) => {
	if (action.type === AUTHORS_FILLED) {
		return uniq([
			...state,
			...Object.keys(action.response.entities.authors)
		]);
	}

	return state;
};

const allIds = (state = [], action) => {
	switch (action.type) {
		case FETCH_AUTHORS_SUCCESS:
			return uniq([
				...state,
				...Object.keys(action.response.entities.authors)
			]);
		default:
			return state;
	}
};

const isFetching = (state = false, {type}) => {
	switch (type) {
		case FETCH_AUTHORS_REQUEST:
			return true;
		case FETCH_AUTHORS_SUCCESS:
			return false;
		default:
			return state;
	}
};

const total = (state = 1, action) => {
	return action.type === AUTHORS_TOTAL ?
		action.total :
		state;
};

export const getAuthorById = (state, authorId) => {
	return state.authors.byId[authorId] || {};
};

export const getAuthors = (state, filter) => {
	let itterable = state.authors.allIds;

	if (Array.isArray(filter)) {
		itterable = itterable.filter(v => {
			return filter.indexOf(Number(v)) !== -1;
		});
	}

	return itterable.map(v => getAuthorById(state, v));
};

export const getAuthorBooks = (state, books) => {
	if (!books) return [];

	return getAllBooks(state).filter(({id}) => {
		return books.indexOf(Number(id)) !== -1;
	});
};

export default combineReducers({
	byId,
	allIds,
	isFetching,
	total,
	byFilled
});