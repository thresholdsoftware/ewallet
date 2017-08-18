import React from 'react';
import DistributorTransactionRow from './distributorTransactionRow.js';
import AppPaginator from './appPaginator.js';
import api from '../utils/api.js';
import moment from 'moment';
import _ from 'lodash';

class DistributorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo : 1,
      totalPages: 0,
      loading: true,
      data: [],
      disabledList: [],
    };
  }

  getDisableCallback(i) {
    return ()=> {
      this.state.disabledList[i] = true;
      this.setState({ disabledList : this.state.disabledList });
    }
  }

  setPage(number) {
    this.setState({pageNo: parseInt(number)});
  }

  getPendingRequests(transaction) {
    return (transaction.creditStatus == 'PENDING');
  }

  getTable(){
    var i,rowsPerPage = 10;
    var rowsJsx = [];
    var pageNo = this.state.pageNo;
    var dataLength = this.state.data.length;


    if (this.state.loading) {
      // Show spinner until data is got from server
      // Start request to server
      api.get(api.CREDIT_REQUESTS_API).then(
        (d)=> d.json().then(
          (creditRequestData)=> { 
            var filteredData = creditRequestData.filter(this.getPendingRequests);
            this.setState(
            {
              data: filteredData,
              loading       : false,
              totalPages    : (filteredData.length+9)/rowsPerPage,
              disabledList  : Array(filteredData.length).fill(false),
            });
          }
        )
      );
      return(<span data-uk-spinner={''}/>);
    }

    for (i=(pageNo-1)*rowsPerPage; i< dataLength && i < pageNo*rowsPerPage; i++)
    {
      var rowData = {
        id       : 'rowData' + i,
        fromName : _.get(this.state.data[i],'userProfile.name'),
        fromNumber : _.get(this.state.data[i],'userProfile.account.phone'),
        referenceNumber : this.state.data[i].transactionId,
        amount: '2.00.00.000',
        date: moment(this.state.data[i].createdAt, moment.ISO_8601).format('DD/MM/YYYY'),
        time: moment(this.state.data[i].createdAt, moment.ISO_8601).format('HH:mm:ss'),
        disabled: this.state.disabledList[i],
      }
        
      rowsJsx.push(
        <DistributorTransactionRow key={i} data={rowData} 
                                   disableCallback = {this.getDisableCallback(i)}/>
      );
    }

    return (
      <table className="uk-table-hover uk-table-small uk-table-middle uk-table uk-table-striped">
        <caption> Distributor cash additions: </caption>
        <thead>
          <tr>
            <th>From</th>
            <th>Amount</th>
            <th>Date Time</th>
            <th>Reference #</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {rowsJsx}
        </tbody>
      </table>
    );

  }
  render () {
    return (
      <div className="uk-container uk-margin uk-container-small uk-background-default">
        <div className="uk-align-center uk-padding uk-text-center">
          { this.getTable() }
          <AppPaginator length="2" callback={(number)=>this.setPage(number)} 
                data={{activeNumber: this.state.pageNo, totalNumber: this.state.totalPages}}/>
        </div>
      </div>
    );
  }
}

export default DistributorPage;
