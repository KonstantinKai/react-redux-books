import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as authorActions from '../actions/authors';
import {getAuthorById, getAuthorBooks} from '../reducers/authors';
import AuthorsItem from '../components/authors/item';

class AuthorContainer extends Component {
	render () {
		return <AuthorsItem {...this.props} />
	}
}

const mapStateToProps = (state, ownProps) => {
	const author = getAuthorById(state, ownProps.match.params.authorId);

	return {
		author,
		getAuthorBooks: () => getAuthorBooks(state, author.books),
		isFetching: state.authors.isFetching
	};
};

const mapDispatchToProps = (dispatch) => {
	const actions = bindActionCreators(authorActions, dispatch);

	return {
		fetchAuthorIfNeeded: (authorId) => actions.fetchAuthorsIfNeeded(authorId)
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthorContainer));