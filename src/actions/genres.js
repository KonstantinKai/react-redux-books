export const FETCH_GENRES_SUCCESS = 'fetch_genres_success';
export const genresRecieve = (resp) => {
    return {
        type: FETCH_GENRES_SUCCESS,
        response: resp
    };
};