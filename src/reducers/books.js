import {combineReducers} from 'redux';
import uniq from 'lodash/uniq';
import merge from 'lodash/merge';
import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    BOOKS_TOTAL,
    BOOKS_FILLED
} from '../actions/books';

const byId = (state = {}, action) => {
    switch (action.type) {
        case FETCH_BOOKS_SUCCESS:
            return merge({}, state, action.response.entities.books);
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case FETCH_BOOKS_SUCCESS:
            return uniq([
                ...state,
                ...Object.keys(action.response.entities.books)
            ]);
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case FETCH_BOOKS_REQUEST:
            return true;
        case FETCH_BOOKS_SUCCESS:
            return false;
        default:
            return state;
    }
};

const total = (state = 1, action) => {
    return action.type === BOOKS_TOTAL ?
        action.total :
        state;
};

const byFilled = (state = [], action) => {
    return action.type === BOOKS_FILLED ?
        uniq([
            ...state,
            ...Object.keys(action.response.entities.books)
        ]) : state;
};

export const getBookById = (state, id) => {
    return state.books.byId[id] || {};
};

export const getBooksByGenre = (state, genreId) => {
    return getAllBooks(state).filter(book => {
        return book.genres && book.genres.indexOf(Number(genreId)) !== -1;
    });
};

export const getBooksByAuthor = (state, authorId) => {
    return getAllBooks(state).filter(book => {
        return book.authors.indexOf(Number(authorId)) !== -1;
    });
};

export const getAllBooks = (state) => {
    return state.books.allIds.map((id) => {
        return state.books.byId[id];
    });
};

export default combineReducers({
    byId,
    allIds,
    isFetching,
    total,
    byFilled
});