import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

import App from './containers/App';

registerServiceWorker();

render(<App />, document.getElementById('root'));
