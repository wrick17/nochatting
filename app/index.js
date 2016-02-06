import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ChatRoom from './components/ChatRoom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import configureStore from './store';

var store = configureStore();

var history = createHistory({
  queryKey: false
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={ChatRoom} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
