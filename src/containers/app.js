import {Component} from 'react';
import {NavLink, withRouter, Switch} from 'react-router-dom';
import {Route} from 'react-router';
import {connect} from 'react-redux';
import appStyle from '../styles/app.styl';

import AuthorsListContainer from './authorsList';
import BooksListContainer from './booksList';
import BookContainer from './bookContainer';
import AuthorContainer from './authorContainer';

class App extends Component {
    render () {
        return (
            <div className="app-container">
                <header>
                    <nav>
                        <NavLink activeClassName="active" className="link indie-flower-font logo" to="/">Books Space</NavLink>
                        <NavLink activeClassName="active" className="link" to="/books">Books</NavLink>
                        <NavLink activeClassName="active" className="link" to="/authors">Authors</NavLink>
                    </nav>
                </header>
                <div className="main-content-wrapper">
                    <Switch>
                        <Route exact path='/' component={AuthorsListContainer} />
                        <Route path="/books" component={BooksListContainer} />
                        <Route path="/books-by-genre/:genreId" component={BooksListContainer} />
                        <Route path="/books-by-author/:authorId" component={BooksListContainer} />
                        <Route path="/book/:bookId" component={BookContainer} />
                        <Route path="/authors" component={AuthorsListContainer} />
                        <Route path="/author/:authorId" component={AuthorContainer} />
                    </Switch>
                </div>
                <footer className="indie-flower-font">
                    All right reserved ;)
                </footer>
            </div>
        );
    }
}

export default withRouter(connect()(App));