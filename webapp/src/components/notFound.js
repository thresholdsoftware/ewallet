import React from 'react';

class NotFound extends React.Component {
    render () {
	return (
            <div className="uk-container uk-container-small uk-background-default">
              <div className="uk-align-center uk-padding uk-text-center">
                <span className="uk-icon" data-uk-icon="icon: warning; ratio:5" />
                <h1> Not Found! </h1>
              </div>
            </div>
            
        );
    }
}

export default NotFound;


