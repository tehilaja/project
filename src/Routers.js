import React, {Component} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import App from './App';


class Routers extends React.Component{

    render() 
    {
        return(
            <React.Fragment>
                    <BrowserRouter>
                        <div>
                            <Route component={App} />
                        </div>
                    </BrowserRouter>
            </React.Fragment>
        )
    }
}

export default Routers;