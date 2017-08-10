import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthorsList from '../components/authors/list';
import * as authorsActions from '../actions/authors';
import {getAuthors, getAuthorBooks} from '../reducers/authors';

class AuthorsListContainer extends Component {
	render () {
		return <AuthorsList {...this.props} />
	}
}

const mapStateToProps = (state) => {
	return {
		isFetching: state.authors.isFetching,
		authors: getAuthors(state),
		getAuthorBooks: (books) => getAuthorBooks(state, books)
	};
};

const mapDispatchToProps = (dispatch) => {
	const {fetchAuthorsIfNeeded} = bindActionCreators(authorsActions, dispatch);

	return {
		fetchAuthorsIfNeeded
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthorsListContainer);