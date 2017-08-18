import React from 'react';


class AppPaginator extends React.Component {

  getNumberRange(activeNumber, totalNumber) {
    /* Given activeNumber returns start number of pagination and end number*/
    var startNumber, endNumber;

    // Denotes number of pages displayed before and after active page
    var paginatorSpan = this.props.length? parseInt(this.props.length): 3; 
    var paginatorLength = 2*paginatorSpan + 1;

    if (activeNumber <= paginatorSpan + 1) {
        startNumber = 1;
        endNumber = paginatorLength;
    } else if (activeNumber > (totalNumber - paginatorSpan)) {
        startNumber = totalNumber - paginatorLength + 1;
        endNumber = totalNumber;
    } else {
        startNumber = activeNumber - paginatorSpan;
        endNumber = activeNumber + paginatorSpan;
    }

    if (endNumber > totalNumber) {
      endNumber = totalNumber;
    }
    return { startNumber, endNumber }

  }
  
  getCallbackMethod(number)
  {
    return ()=>this.props.callback(number);
  }

  getPaginationList(activeNumber, totalNumber) {

    var i;
    var paginationList = [];
    let pn = this.getNumberRange(activeNumber, totalNumber);

    if (activeNumber <= 0 || totalNumber <= 0) {
      return [];
    }
    console.log(activeNumber,totalNumber);

    if (pn.startNumber != 1) {
        paginationList.push(<li> <a onClick={this.getCallbackMethod(1)} 
                                    data-uk-icon="icon : arrow-left" /> </li>);
        paginationList.push( <li className="uk-disabled"> <span>...</span> </li>);
    }

    for( i = pn.startNumber; i <= pn.endNumber; i++) {

      if (i == activeNumber) {
        paginationList.push(<li key={i} className="uk-active"><span className="">{i}</span></li>)
      } else {
        paginationList.push(<li key={i}><a onClick={this.getCallbackMethod(i)}>{i}</a></li>);
      }

    }

    if (pn.endNumber != totalNumber) {
        paginationList.push( <li key={i} className="uk-disabled"> <span>...</span> </li>);
        paginationList.push(<li key={i}> <a onClick={this.getCallbackMethod(totalNumber)} 
                                    data-uk-icon="icon : arrow-right" /> </li>);
    }

    return paginationList;
  }

  render () {
  
    return(
      <div>
          <ul className="uk-pagination uk-flex-center" >
            { this.getPaginationList(this.props.data.activeNumber, 
                                  this.props.data.totalNumber) }
          </ul>
      </div>
    );
  }
}

export default AppPaginator;

