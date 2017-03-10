import React, {Component} from 'react';
import './Home.css';

class Home extends Component {
  render () {
    return (
      <div>
        <div>Scratch Card Management</div>
        <div>User Management</div>
        <div>Bank Account Management</div>
        <div>Analytics</div>
      </div>
    );
  }
}

// Analytics -
// No of Transactions per year, month , week , day
// No of Active Users per year, month , week , day
// No of Scratch cards user per year , month ,week ,day
// No of Scratch cards generated per year , month, week ,day
// Total amount in Ewallet
// Generic DB Browser

export default Home;
