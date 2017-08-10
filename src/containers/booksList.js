import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import merge from 'lodash/merge';
import BooksList from '../components/books/list';
import {
    getAllBooks,
    getBooksByGenre,
    getBooksByAuthor
} from '../reducers/books';
import {getGenres} from '../reducers/genres';
import {getAuthors} from '../reducers/authors';
import * as booksActions from '../actions/books';

class BooksListContainer extends Component {
    render () {
        return <BooksList {...this.props} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const {genreId, authorId} = ownProps.match.params;
    const props = {};

    if (genreId) {
        props.books = getBooksByGenre(state, genreId);
    } else if (authorId) {
        props.books = getBooksByAuthor(state, authorId);
    } else {
        props.books = getAllBooks(state);
    }

    props.isFetching = state.books.isFetching;

    props.getBookAuthors = (authors) => {
        return getAuthors(state, authors);
    }

    if (genreId) {
        let [genre] = getGenres(state, [genreId]);
        props.genre = genre;
    }

    return props;
};

const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators(booksActions, dispatch);

    return merge({}, actions);
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BooksListContainer));