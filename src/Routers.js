// import OrgPage from "./organization/";


import React, {Component} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import App from './App'
import OrgPage from './components/OrgComponents/OrgPage.js';
import OrgBody from './components/OrgComponents/OrgBody.js';
import UserPage from './components/UserComponents/UserPage.js'
import NewOrgPage from './components/NewOrgComponents/NewOrgPage.js'
import OrgSearch from './components/OrgComponents/OrgSearch.js'
import Prizes from './components/Prizes.js'


class Routers extends React.Component{

    render() 
    {
        return(
            <React.Fragment>
                    <BrowserRouter>
                        <div>
                            <Route exact path="/" component={App}/>
                            <Route  path="/UserPage" component={UserPage}/>
                            <Route  path="/OrgPage" component={OrgPage}/>
                            <Route path ="/OrgBody" component={OrgBody} />
							<Route path ="/NewOrgPage" component={NewOrgPage} />
                            <Route path ="/OrgSearch" component={OrgSearch} />
                            <Route path ="/Prizes" component={Prizes} />
                        </div>
                    </BrowserRouter>
            </React.Fragment>
            //     <Switch>
            //     <Route exact path="/" component={App}/>
            //     <Route  path="/OrgPage" component={OrgPage}/>
            // </Switch>
        )
    }
}

export default Routers;