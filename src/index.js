import 'babel-polyfill';
import {render} from 'react-dom';
import {Route} from 'react-router';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './containers/app';

import reducers from './reducers';

const history = createHistory();
const rMiddleware = routerMiddleware(history);

const store = createStore(
    reducers(routerReducer),
    applyMiddleware(thunk, rMiddleware)
);

render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route path="/" component={App}/>
            </div>
        </ConnectedRouter>
    </Provider>
), document.getElementById('app'));
