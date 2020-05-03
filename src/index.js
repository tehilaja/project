import React from 'react';
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import './index.css';
import App from './App';
import Routers from './Routers'

import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css' //css library


//setting up redux:
import { Provider } from 'react-redux';


//---main
ReactDOM.render(
    // <BrowserRouter>
    //     <Switch>
    //         <Route path="/admin" render={props => <App {...props} />} />
    //         <Redirect from="/" to="/admin/dashboard" />
    //     {/* <App /> */}
    //     </Switch>
    // </BrowserRouter>,


    // <App />,
    //  document.getElementById("root")

    <Routers />,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
