import {Component} from 'react';
import {NavLink} from 'react-router-dom';
import getImage from '../../api/images';

export default class BooksListItem extends Component {
	render () {
		const {book, getBookAuthors} = this.props;
		const image = 'url(' + getImage(book.id) + ')';

		return (
			<div className="book-item" style={{
					backgroundImage: image
				}}>
				<div className="book-info">
					<NavLink className="link" to={'/book/' + book.id}>{book.title}</NavLink>
					<div className="book-authors">
						{getBookAuthors(book.authors).map(author => {
							return <p key={author.id}>
								<NavLink className="link"
									to={'/author/' + author.id}>
									{author.fullName}
								</NavLink>
							</p>
						})}
					</div>
				</div>
			</div>
		);
	}
}