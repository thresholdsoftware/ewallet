import React from 'react';
import { Link } from 'react-router-dom';

class AppNavbar extends React.Component {
    getLogoutButton() {
      if (this.props.logoutCb) {
        return(
                <li className="uk-navbar-item">
                  <a onClick={this.props.logoutCb} >
                    <span className="uk-icon uk-margin-small-right"
                    data-uk-icon="icon: sign-out" />
                    Log Out
                  </a>
                </li>
        );
      }
    }
    render () {
	return (
        <div>
          <nav className="uk-navbar-container " data-uk-navbar>
            <div className="uk-navbar-center">
              <a className="uk-navbar-item uk-logo" href="#"> 
                <h2> E-Wallet </h2>
              </a>
            </div>
          </nav>
          <nav className="uk-navbar-container uk-margin-bottom" data-uk-navbar>
            <div className="uk-navbar-center">
              <ul className="uk-navbar-nav uk-subnav-divider">
                <li className="uk-navbar-item">
                  <Link to={{pathname : '/history'}}>
                    <span className="uk-icon uk-margin-small-right" 
                    data-uk-icon="icon: list" />
                    Transactions
                  </Link>
                </li>
                <li className="uk-navbar-item">
                  <Link to={{pathname : '/distributors'}}>
                    <span className="uk-icon uk-margin-small-right"
                    data-uk-icon="icon: users" />
                    Distributors
                  </Link>
                </li>
                <li className="uk-navbar-item">
                  <Link to={{pathname : '/settings'}}>
                    <span className="uk-icon uk-margin-small-right"
                    data-uk-icon="icon: cog" />
                    Settings
                  </Link>
                </li>
                { this.getLogoutButton() }
              </ul>
            </div>
          </nav>
        </div>
        );
    }
}

export default AppNavbar;

