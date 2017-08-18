import React from 'react';
import AppModal from './appModal.js';
import api from '../utils/api.js';

class DistributorTransactionRow extends React.Component {
  
/*  constructor(props) {
    super(props);
    this.state = {
      disabled : false,
    };
  }*/

  getConfirmCallback() {
    return ()=> {
      api.put(api.CREDIT_APPROVAL_API+this.props.data.referenceNumber,
        {'creditStatus': 'APPROVED'}
      ).then((d)=> {
        UIkit.notification(`<div class='uk-text-center'> 
                              <span uk-icon='check'/>
                              Approved transaction
                            </div>`, {status: 'primary', pos:'bottom-center'})
        //this.setState({disabled : true});
        this.props.disableCallback();
        }
	  ).catch((err) => {
        UIkit.notification(`<div class='uk-text-center'> 
                              <span uk-icon='warning'/>
                              Failed to approve transaction
                            </div>`, {status: 'danger',pos:'bottom-center'});
		console.log(err);
	  });
    }

  }
  
  getButton() {
    if (this.props.data.disabled) {
      return(
        <button className="uk-button uk-button-default" data-disabled>
          Approved
        </button>
      );
    } else {
      return(
        <AppModal data={ {buttonText: 'Approve', modalId : this.props.data.id} }
                  confirmCb={this.getConfirmCallback()}/>
      );
    }
  }

  render () {
    return(
            <tr>
              <td>
                <span> { this.props.data.fromName } </span>
                <p className="uk-text-meta"> { this.props.data.fromNumber } </p>
              </td>
              <td> { this.props.data.amount } </td>
              <td> 
                <p className="uk-text-meta"> 
                  { this.props.data.date } <br/> { this.props.data.time }  
                </p>
              </td>
              <td> { this.props.data.referenceNumber } </td>
              <td> { this.getButton() }</td>
            </tr>
      );
    }
}

export default DistributorTransactionRow;
