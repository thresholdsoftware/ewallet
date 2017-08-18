import React from 'react';
import TransactionRow from './transactionRow.js';
import AppPaginator from './appPaginator.js';
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'
import api from '../utils/api.js';
import moment from 'moment';

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages:0,
      activePageNo : 0 ,
      tableVisible: false,
      pageLoading: true,
      tableLoading: true,
      rowsData:[],
    };
    this.rowsPerPage = 10;
  }

  setPage(number) {
    this.setState({activePageNo: parseInt(number), tableLoading: true});
    api.get(api.GET_ALL_TRANSACTION_API+'?page='+number).then((d)=> d.json().then(
        (transactionData)=> 
          this.setState(
              { 
                tableLoading  : false,
                activePageNo  : parseInt(number),
                rowsData      : transactionData,
              }))
    ).catch((err)=>console.log(err));
  }
  
  getTableBody(){
    var rows = [];
    var i;
    var rowInfo;
    var placeholderData = {
      fromName : 'Raveendra Soori',
      fromNumber : '9035777009',
      toName : 'Michael Carleon',
      toNumber: '9449253234',
      amount: '2.00.35.233',
      time: '13:53 23/06/2017'
    }

    if (this.state.tableLoading)
    {
      return( <tr> <td className="uk-text-center" colSpan={4}><span data-uk-spinner={''}/> </td> </tr>);
    }
    for (i=0;i<this.state.rowsData.length; i++)
    {
      rowInfo = {
        fromName: this.state.rowsData[i].fromAccount.userProfile.name || 'Sender', 
        fromNumber: this.state.rowsData[i].fromAccount.phone,
        toName: this.state.rowsData[i].toAccount.userProfile.name || 'Recepient',
        toNumber: this.state.rowsData[i].toAccount.phone,
        amount: this.state.rowsData[i].amount,
        date: moment(this.state.rowsData[i].updatedAt, moment.ISO_8601).format('DD/MM/YYYY'),
        time: moment(this.state.rowsData[i].updatedAt, moment.ISO_8601).format('HH:mm:ss'),
      }
      rows.push(
        <TransactionRow data={rowInfo} />
      );
    }
    return rows;
  }

  loadPageContents()
  {
    //This is responsible for rendering the table and the paginator

    if (!this.state.tableVisible) {
      // Initial state, nothing visible
      return '';
    } else if (this.state.pageLoading) {

      // When button is initially pressed display spinner and set paginator values.
      api.get(api.GET_TRANSACTION_COUNT_API).then((d)=> d.json().then(
          (countData)=> {
            console.log(countData);
            this.setState(
                { 
                  pageLoading   : false,
                  totalPages    : parseInt((countData.totalTransactions+9)/this.rowsPerPage),
                });
            this.setPage(1);
    })
      );
      return(<span data-uk-spinner={''}/>);
    }

    return (
      <div>

        <table className="uk-table-hover uk-table-small uk-table-middle uk-table uk-table-striped">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {this.getTableBody()}
          </tbody>
        </table>

        <AppPaginator callback={(number)=>this.setPage(number)} 
                      data={{ activeNumber   : this.state.activePageNo, 
                              totalNumber    : this.state.totalPages     }}/>
      </div>
    );
  }

  render () {
    return (
      <div className="uk-container uk-margin uk-container-small uk-background-default">
        <div className="uk-align-center uk-padding uk-text-center">
          <div className="uk-text-large">
            Select a date range to get list of all transactions in the range.
          </div>
          <span className="uk-margin-left uk-margin-right">From </span>
          <DateField
            forceValidDate
            defaultValue={"30-05-2015 09:23 AM"}
            dateFormat="DD-MM-YYYY hh:mm a"
          />
          <span className="uk-margin-left uk-margin-right">To </span>
          <DateField
            forceValidDate
            defaultValue={"30-05-2015 09:23 AM"}
            dateFormat="DD-MM-YYYY hh:mm a"
          />
          <button 
            onClick={()=>this.setState({tableVisible:true})} 
            className="uk-button uk-button-primary uk-margin-left"
          > Go </button>
          <br/>
          { this.loadPageContents() }
        </div>
      </div>
    );
  }
}

export default TransactionHistory;
