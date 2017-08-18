import React from 'react';
import { Switch, Route } from 'react-router';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

import jQuery from 'jquery';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import './main.css'

import Home from './components/home.js';
import AppNavbar from './components/navbar.js';
import AppFooter from './components/footer.js';
import TransactionHistory from './components/transactionHistory.js';
import DistributorPage from './components/distributorPage.js';
import LoginPage from './components/loginPage.js';
import SettingsPage from './components/settingsPage.js';
import NotFound from './components/notFound.js';
import api from './utils/api.js';
UIkit.use(Icons);

window.jQuery = jQuery;
window.UIkit = UIkit;

class RouterApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn : this.isLoggedIn() ,
    };
  }

  isLoggedIn() {
    api.get(api.USER_API).then((d)=> {
      if (d.status == 200) {
        this.setState({loggedIn:true});
      }
    });
    return false;
  }    

  getLoginCallback() {
    return ()=>this.setState({loggedIn : true});
  }

  getLogoutCallback() {
    return ()=>{
      this.setState({loggedIn : false});
      api.get(api.LOGOUT_API).then((d)=> {
        if (d.status == 200) {
          this.setState({loggedIn:false});
        }
      });
    }
  }

  getNavbar() {
    if (this.state.loggedIn) {
      return (
        <Route path="/" >
          <AppNavbar logoutCb={this.getLogoutCallback()} />
        </Route>
      );
    } else {
      return (
        <Route path="/" >
          <AppNavbar />
        </Route>
      );
    }
  }

  getPageContent() {
    if (!this.state.loggedIn) {
      return (<Route path="/" render={()=><LoginPage loginCb={this.getLoginCallback()} />} />);
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/history" component={TransactionHistory} />
          <Route path="/distributors" component={DistributorPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route component={NotFound} />
        </Switch>
      );
    }
  }

  render() {
    return(
      <HashRouter>
        <div className="fullPage siteBackground">
          <div className="pageWrap siteBackground">
            { this.getNavbar() }
            { this.getPageContent() }
          </div>
          <Route path="/" component={AppFooter} />
        </div>
      </HashRouter>
    );
  }
}

render(<RouterApp />, document.getElementById('app'));


