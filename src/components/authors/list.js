import {Component} from 'react';
import Loader from '../loader';
import AuthorsListItem from './listItem';
import listStyles from '../../styles/author-list-page.styl';

export default class AuthorsList extends Component {
    componentDidMount () {
        const {fetchAuthorsIfNeeded} = this.props;

        fetchAuthorsIfNeeded();  
    }

    render () {
        const {authors, isFetching, getAuthorBooks} = this.props;

        return (
            (() => {
                if (isFetching) return <Loader />
                return (
                    <div className="authors-container">
                        <div className="author-list">
                            {authors.map(author => {
                                return (
                                    <AuthorsListItem
                                        key={author.id}
                                        author={author}
                                        getAuthorBooks={getAuthorBooks} />
                                )
                            })}
                        </div>
                    </div>
                )
            })()
        )
    }
}