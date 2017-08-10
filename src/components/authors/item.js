import {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Loader from '../loader';

export default class AuthorsItem extends Component {
	componentDidMount () {
		const {fetchAuthorIfNeeded} = this.props;

		fetchAuthorIfNeeded(this.props.match.params.authorId);
	}

	render () {
		const {
			author,
			getAuthorBooks,
			isFetching
		} = this.props;
		
		return (
			<div className="author">
				{(() => {
					if (isFetching) {
						return <Loader />
					} else {
						return (
							<div>
								<h2>{author.fullName}</h2>
								<div className="author-books">
									<p>Books: </p>
									<ul>
										{getAuthorBooks().map(book => {
											return <li key={book.id}>
												<NavLink className="link" to={'/book/' + book.id}>{book.title}</NavLink>
											</li>
										})}
									</ul>
								</div>
								<p>Biography: </p>
								<div className="author-biography">{author.biography}</div>
							</div>
						)
					}
				})()}
			</div>
		);
	}
}