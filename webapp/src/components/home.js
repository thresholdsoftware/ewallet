import React from 'react';

class Home extends React.Component {
    render () {
	return (
      <div className="uk-container uk-container-small uk-background-default">
        <div className="uk-align-center uk-padding uk-text-center">
          <span className="uk-icon" data-uk-icon="icon: lifesaver; ratio:5" />
          <h2> Click one of the options above to procede. You can view and set current transaction fees under settings</h2>
        </div>
      </div>
    );
 
    }
}

export default Home;
