import React, {Component} from 'react';
import Loader from 'react-loader-spinner';
import * as $ from 'jquery';

import modal from 'bootstrap/js/dist/modal';

class WaitingModal extends Component{
	constructor(props) {
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
		    message:""
		};
	}

	componentDidMount() {
		this.props.onRef(this);

	}

	componentWillUnmount() {
		this.props.onRef(null)

	}

	handleClose() {
		$('#modal').modal('hide');
		$('#modal').removeClass('in');
		$('.modal-backdrop').remove();
		$('#modal').css('display', 'none');
	}

	handleShow(msg) {
		this.setState({message:msg});
		$('#modal').addClass('in');
		$('#modal').css('display', 'block');
	}

	render(){
		return(
			<div className="modal fade" id="modal" ref={el => this.el = el}>
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
          				<div className="modal-header">
            				<h4 className="modal-title">
            					{this.state.message}
            				</h4>
          				</div>
          				<div className="modal-body" style={{textAlign:'center'}}>
            				<Loader 
								type="Oval" 
								color="#64b5f6" 
								height={80} 
								width={80}
							/>
          				</div>
        			</div>
				</div>
			</div>
		)
	}
}

export default WaitingModal;