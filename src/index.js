import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './containers/App';

registerServiceWorker();

render(<App />, document.getElementById('root'));
