import React from 'react';
import api from '../utils/api.js';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '' ,
      password : '',
    };
  }

  handleChange(field, ev) {
    var nextState = {}
    nextState[field] = ev.target.value
    this.setState(nextState)
  }

  getLoginCallback() {
    return () => {
      api.post(api.LOGIN_API, {
        phone: this.state.username,
        password: this.state.password
      }).then((d) => {
        //scope.message = d;
        console.log(d.status);
        this.props.loginCb();
        api.get(api.USER_API).then((d)=> d.json().then((x)=>console.log(x)));
      }).catch((err) => {
        UIkit.notification(`<div class='uk-text-center'> 
          <span uk-icon='warning'/>
          Login Failed
          </div>`, {status: 'danger',pos:'bottom-center'});
        console.log(err);
      });
    }
  }
  render () {
    return (
      <div className="uk-container uk-container-small uk-vertical-align uk-text-center uk-margin-bottom">
        <div className="uk-align-center uk-padding uk-background-default" 
              style={{width: 250}}>
          <span className="uk-icon" data-uk-icon="icon: user; ratio:5" />
          <form className="uk-align-center">
            <div className="uk-form-row uk-margin">
              <input className="uk-width-1-1 uk-form-large" placeholder="Username" 
                     type="text" onChange={this.handleChange.bind(this, 'username')}/>
            </div>
            <div className="uk-form-row uk-margin">
              <input className="uk-width-1-1 uk-form-large" placeholder="Password"
                     type="password" onChange={this.handleChange.bind(this, 'password')}/>
            </div>
            <div className="uk-form-row">
              <a onClick={ this.getLoginCallback() } 
                 className="uk-width-1-1 uk-button uk-button-primary uk-button-large" >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>

    );
    }
}

export default LoginPage;

