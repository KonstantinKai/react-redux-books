import {Component} from 'react';
import {NavLink, Route} from 'react-router-dom';
import {history} from 'react-router';

export default class AuthorsListItem extends Component {
	render () {
		const {author, getAuthorBooks} = this.props;
		const books = getAuthorBooks(author.books);

		return (
			<Route render={({history}) => (
				<div className="author-item">
					<span>{author.fullName}</span>
					<div className="author-actions">
						<span
							className="go-to-author"
							onClick={this.gotoAuthorPage.bind(this, history)}>Go to author page
						</span>
						<ul>
							{books.map(book => {
								return (
									<li key={book.id}>
										<NavLink className="link" to={'/book/' + book.id}>{book.title}</NavLink>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			)}/>
		);
	}

	gotoAuthorPage (history) {
		const {author} = this.props;

		history.push('/author/' + author.id);
	}
}