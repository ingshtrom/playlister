import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from '../store'
import Auth from '../services/Auth';
import Content from './Content';
import Callback from './Callback';
import Header from '../components/Header';
// import Footer from '../components/Footer';

import './App.css';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>

            <Header auth={auth} />

            <main role='main' className='container'>
              <Switch>
                <Route path="/callback" render={(props) => {
                  handleAuthentication(props);
                  return <Callback {...props} />
                }}/>
                <Route path='/*' render={props => <Content auth={auth} {...props} />} />
              </Switch>
            </main>

            { /* <Footer /> */ }
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
