import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

class WaitingModal extends Component{
	constructor(props) {
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
		    show: false,
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
		this.setState({ show: false});
	}

	handleShow(msg) {
		console.log(msg)
		this.setState({ show: true,message:msg});
	}

	render(){
		return(
			<Modal show={this.state.show} bsSize="small"> 
        		<Modal.Header >
		        	<Modal.Title>{this.state.message}</Modal.Title>
		        </Modal.Header>
       			<Modal.Body >
	       			 <div style={{textAlign:'center'}}>
						<Loader 
							type="Oval" 
							color="#64b5f6" 
							height={80} 
							width={80}
						/> 
					</div>
		        </Modal.Body>
	      	</Modal>
		)
	}
}

export default WaitingModal;