import React from 'react';
import AppModal from './appModal.js';
import api from '../utils/api.js';

class SettingsRow extends React.Component {
  render() {
    return (
            <tr>
              <td className="uk-table-expand">
                <p className="uk-text-large uk-text-nowrap" >
                  { this.props.data.text }
                </p>
              </td>
              <td>
                <input className="uk-width-small uk-form-large" type="text" 
                    value={this.props.data.value} onChange={this.props.onChange}/>
                <span className="uk-text-large uk-text-left"> %</span>
              </td>
            </tr>
    );
  }
}

class SettingsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading       : true,
      requestFailed : false,
      requestCount  : 0,
      transactionFees : {
        WALLET_TO_DISTRIBUTOR : 0,
        DISTRIBUTOR_TO_WALLET : 0,
        BANK_TO_WALLET        : 0,
        WALLET_TO_WALLET      : 0,
      }
    };
  }

  handleChange(transactionType, ev) {
    var nextFees = this.state.transactionFees;
    nextFees[transactionType] = ev.target.value;
    this.setState({transactionFees: nextFees});
  }

  getConfirmCb() {
    return ()=> {
      for (var type in this.state.transactionFees) {
        api.put(api.UPDATE_TRANSACTION_FEE_API + type, {
          fee: this.state.transactionFees[type],
        }).then((d) => {
          d.json().then((x)=>console.log(x))
          console.log('RSOORI');
          console.log(d);
          this.setState( { requestCount : this.state.requestCount + 1 });
          if (this.state.requestCount == 4 && !this.state.requestFailed) {
            UIkit.notification(`<div class='uk-text-center'> 
                                  <span uk-icon='check'/>
                                  Transaction fees updated
                                </div>`, {status: 'primary',pos:'bottom-center'});
          }
        }).catch((err) => {
          UIkit.notification(`<div class='uk-text-center'> 
                                <span uk-icon='warning'/>
                                Failed to update transaction fee
                              </div>`, {status: 'danger',pos:'bottom-center'});
          console.log(err);
        });
      }
    }
  }

  getSettingsRow(text,transactionType) {
    return(
      <SettingsRow 
        onChange={this.handleChange.bind(this, transactionType)}
        data={{text:text,value:this.state.transactionFees[transactionType]}} />
    );
  }

  loadPageContents() {
    if (this.state.loading) {
      api.get(api.GET_TRANSACTION_FEE_API).then(
        (d)=> d.json().then(
          (feeData)=> { 
            var initialState = {};
            var each;
            for (each in feeData) {
              initialState[feeData[each].transactionType] = feeData[each].fee;
            }
            this.setState(
            {
              transactionFees: initialState,
              loading       : false,
            });
          }
        )
      );
      return(<span data-uk-spinner={''}/>);
    } else {
      return(
        <div>
          <form className="uk-align-center uk-text-left">
            <table className="uk-table uk-align-center">
              <tbody>

                { this.getSettingsRow('User wallet to distributor wallet',
                                 'WALLET_TO_DISTRIBUTOR') }

                { this.getSettingsRow('Distributor wallet to user wallet', 
                                 'DISTRIBUTOR_TO_WALLET') }

                { this.getSettingsRow('User wallet to user wallet',
                                 'WALLET_TO_WALLET') }

                { this.getSettingsRow('Bank to distributor wallet',
                                 'BANK_TO_WALLET') }

              </tbody>
            </table>
          </form>
        <AppModal data={{buttonText: 'Save Changes'}} confirmCb={this.getConfirmCb()}/>
      </div>
      );
    }
  }

  render () {
    return (
            <div className="uk-container uk-container-small uk-margin uk-background-default">
              <div className="uk-align-center uk-padding uk-text-center">
                <h2> Settings</h2>
                { this.loadPageContents() }
              </div>
            </div>
            
        );
    }
}

export default SettingsPage;
