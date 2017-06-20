import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { App } from './react-components/react-app.js';


ReactDOM.render(
       <BrowserRouter basename='/'>
           <App />
       </BrowserRouter>,
   document.getElementById('main-component')
);
