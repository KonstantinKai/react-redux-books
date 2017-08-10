import {combineReducers} from 'redux';
import merge from 'lodash/merge';
import {FETCH_GENRES_SUCCESS} from '../actions/genres';

const byId = (state = {}, action) => {
	switch (action.type) {
		case FETCH_GENRES_SUCCESS:
			return merge({}, state, action.response.entities.genres);
		default:
			return state;
	}
};

export const getGenres = (state, genres) => {
	const length = Object.keys(state.genres.byId).length;

	return length && genres.map(genre => {
		return state.genres.byId[genre];
	}) || [];
}

export default combineReducers({
	byId
});