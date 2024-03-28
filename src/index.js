// My imports
import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/common/scrollToTop';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// My styles
import './css/custom.css';

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
