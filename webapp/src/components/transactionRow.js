import React from 'react';

class TransactionRow extends React.Component {
  render(){
    return(
            <tr>
              <td>
                <span> { this.props.data.fromName } </span>
                <p className="uk-text-meta"> { this.props.data.fromNumber } </p>
              </td>
              <td>
                <span> { this.props.data.toName } </span>
                <p className="uk-text-meta"> { this.props.data.toNumber } </p>
              </td>
              <td> { this.props.data.amount } </td>
              <td> 
                <p className="uk-text-meta"> 
                  { this.props.data.date } <br/> { this.props.data.time }  
                </p>
              </td>
            </tr>
      );
  }
}

export default TransactionRow;
