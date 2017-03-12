import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import DbSearch from './pages/DbSearch/DbSearch';
import Home from './pages/Home/Home';
import Charts from './pages/Charts/Charts';
import PieCharts from './pages/Charts/PieCharts';
import reducers from './redux/reducers';
import './index.css';

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Home} />
      <Route path='/charts' component={Charts} />
      <Route path='/pie' component={PieCharts} />
      <Route path='/search' component={DbSearch} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
