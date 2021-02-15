import React from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createRootReducer from './redux/reducers'
import { routerMiddleware, ConnectedRouter as Router } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import NavBar from './components/NavBar'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'

import './App.css';

const history = createBrowserHistory()
const store = createStore(
  createRootReducer(history), // root reducer with router state
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/registration"><Registration /></Route>
            <Route path="/login"><Login /></Route>
            <Route exact path="/"><Home /></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
