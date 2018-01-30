import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from '../store'

import ContentList from './ContentList';
import Playlist from './Playlist';
import NotFound from './NotFound';

import Header from '../components/Header';
import Footer from '../components/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header />

            <main role='main' className='container'>
              <Switch>
                <Route path='/old-404' component={NotFound} />
                <Route path='/playlist/:id' component={Playlist} />
                <Route path='/*' component={ContentList} />
              </Switch>
            </main>

            <Footer />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
