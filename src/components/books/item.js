import {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Loader from '../loader';

import bookStyle from '../../styles/book-item-page.styl';

export default class BooksItem extends Component {
	componentDidMount () {
		const {fetchBookIfNeeded} = this.props;

		fetchBookIfNeeded(this.props.match.params.bookId);
	}

	render () {
		const {
			getBook,
			isFetching,
			getGenres,
			getAuthors
		} = this.props;

		return (
			<div className="book">
				{(() => {
					if (isFetching) {
						return <Loader />
					} else {
						const book = getBook();

						return (
							<div>
								<h2>{book.title}</h2>
								<div className="book-authors">
									<p>Authors: </p>
									<ul>
										{getAuthors(book.authors).map(author => {
											return <li key={author.id}>
												<NavLink className="link" to={'/author/' + author.id}>{author.fullName}</NavLink>
											</li>
										})}
									</ul>
								</div>
								<div className="book-genres">
									<p>Genres: </p>
									<ul>
										{getGenres(book.genres).map(genre => {
											return <li key={genre.id}>
												<NavLink className="link" to={'/books-by-genre/' + genre.id}>{genre.name}</NavLink>
											</li>
										})}
									</ul>
								</div>
								<p>Description: </p>
								<div className="book-short-content">{book.shortContent}</div>
							</div>
						);
					}
				})()}
			</div>
		);
	}
}