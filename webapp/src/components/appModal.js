import React from 'react';

class AppModal extends React.Component {

  constructor(props) {
    super(props);
    this.modalId = this.props.data.modalId? this.props.data.modalId:'modal'
  }
 
  render () {
    return(
      <div>
        <a className="uk-button uk-button-primary" 
           data-uk-toggle={ "target : #" + this.modalId }>
          { this.props.data.buttonText? this.props.data.buttonText : 'Confirm' }
        </a>
        <div id={ this.modalId } data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body">
            <button className="uk-modal-close-default" type="button" data-uk-close>
            </button>
            <h2 className="uk-modal-title uk-text-center">
              { this.props.data.headline? this.props.data.headline : 'Confirm' }
            </h2>
            <p>
              { this.props.data.headline? this.props.data.headline : 
                'Please confirm your action! You might not be able to revert your action' }
            </p>
            <p className="uk-text-right">
              <button className="uk-button uk-button-default uk-modal-close" 
                      type="button"> Cancel </button>
              <button className="uk-button uk-button-primary uk-modal-close" 
                      type="button" onClick={this.props.confirmCb}>
                Confirm
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AppModal;
