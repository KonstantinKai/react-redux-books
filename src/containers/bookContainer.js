import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import merge from 'lodash/merge';
import {getBookById} from '../reducers/books';
import {getGenres} from '../reducers/genres';
import {getAuthors} from '../reducers/authors';
import * as booksActions from '../actions/books';
import BooksItem from '../components/books/item';

class BookContainer extends Component {
    render () {
        return <BooksItem {...this.props} />
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        getBook: () => getBookById(state, ownProps.match.params.bookId),
        getAuthors: (authors) => getAuthors(state, authors),
        getGenres: (genres) => getGenres(state, genres),
        isFetching: state.books.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    const {fetchBooksIfNeeded} = bindActionCreators(booksActions, dispatch);

    return {
        fetchBookIfNeeded: (bookId) => fetchBooksIfNeeded(bookId)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BookContainer));