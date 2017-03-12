import React, {Component} from 'react';
import {getTableHeader} from '../../utils/transformer';
import JSONTableViewer from '../../components/JSONTableViewer';

const sample = [
  {
    a: 1,
    b: 22,
    c: 3,
    d: 3
  }, {
    a: 21,
    b: 23,
    c: 33,
    d: 32
  }, {
    a: 31,
    b: 63,
    c: 37,
    d: 89
  }
];

class DbSearch extends Component {
  state = {
    searchText: null,
    data: sample
  }
  onTextChange = (e) => {
    this.setState({searchText: e.nativeEvent.target.value});
  }
  onSearchSubmit = () => {

  }
  render () {
    const {data} = this.state;
    const headers = getTableHeader(data);
    return (
      <div>
        <input type='text' name='query' onChange={this.onTextChange} />
        <input type='submit' name='submit' value='submit'/>
        <JSONTableViewer headers={headers} data={data} />
      </div>);
  }
}

export default DbSearch;
