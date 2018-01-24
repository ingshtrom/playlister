import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from '../store'

import Home from './Home';
import Playlists from './Playlists';
import Videos from './Videos';
import Playlist from './Playlist';
import Video from './Video';

import Header from '../components/Header';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header />

            <main role='main' className='container'>
              <Route exact path='/' component={Home} />
              <Route exact path='/playlists' component={Playlists} />
              <Route exact path='/videos' component={Videos} />
              <Route path='/playlist/:id' component={Playlist} />
              <Route path='/video/:id' component={Video} />
            </main>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
