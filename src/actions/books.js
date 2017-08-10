import {normalize} from 'normalizr';
import fetchBooks from '../api/books';
import * as books from '../schemas/books';
import * as genres from '../schemas/genres';
import * as authors from '../schemas/authors';
import {genresRecieve} from './genres';
import {authorsRecieve} from './authors';

books.book.define({
    genres: genres.arrayOfGenres,
    authors: authors.arrayOfAuthors
});

export const FETCH_BOOKS_REQUEST = 'fetch_books_request';
const booksRequest = () => {
    return {
        type: FETCH_BOOKS_REQUEST
    };
};

export const FETCH_BOOKS_SUCCESS = 'fetch_books_success';
export const booksRecieve = (response) => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        response
    };
};

export const BOOKS_TOTAL = 'books_total';
const booksTotal = (total) => {
    return {
        type: BOOKS_TOTAL,
        total: total
    };
};

export const BOOKS_FILLED = 'books_filled';
const booksFilled = (response) => {
    return {
        type: BOOKS_FILLED,
        response
    };
};

const shouldFetchBooks = (state, id) => {
    const byFilled = state.books.byFilled;

    if (id) {
        return byFilled.indexOf(id.toString()) === -1;
    }
    
    return byFilled.length < state.books.total;
};

export const fetchBooksIfNeeded = (id) => {
    return (dispatch, getState) => {
        if (shouldFetchBooks(getState(), id)) {
            dispatch(booksRequest());

            fetchBooks(id).then(resp => {
                const normalized = normalize(resp.entities, books.arrayOfBooks);

                dispatch(booksTotal(resp.total));
                dispatch(booksFilled(normalized));
                dispatch(booksRecieve(normalized));
                dispatch(genresRecieve(normalized));
                dispatch(authorsRecieve(normalized));
            });
        }
    };
};

