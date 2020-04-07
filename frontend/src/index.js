import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './container/Home'
import Map from './map'
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


ReactDOM.render(
  <Provider store = {store} >
 <Router history={hashHistory}>  
      <Route path = '/' component = {App}>
        <IndexRoute component={Home}/>
        <Route path = '/mapas' component = {Map}/>
      </Route>        
    </Router>
  </Provider>
    ,
  document.getElementById('root')
);


serviceWorker.unregister();
