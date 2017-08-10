import {Component} from 'react';
import BooksListItem from './listItem';
import Loader from '../loader';

import listStyles from '../../styles/books-list-page.styl';

export default class BooksList extends Component {
	componentDidMount () {
		const {fetchBooksIfNeeded} = this.props;

		fetchBooksIfNeeded();
	}

	render () {
		const {
			books,
			isFetching,
			genre,
			getBookAuthors
		} = this.props;

		return (
			(() => {
				if (isFetching) {
					return <Loader />
				} else {
					const list = <div className="books-list">
						{books.map((book) => {
							return <BooksListItem
								key={book.id}
								book={book}
								getBookAuthors={getBookAuthors} />
						})}
					</div>

					if (genre) {
						return <div className="books-container">
							<div className="active-genre">Books by genre: <strong>{genre.name}</strong></div>
							{list}
						</div>
					} else {
						return <div className="books-container">{list}</div>;
					}
				}
			})()
		);
	}
}