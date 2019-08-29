import React, {Component} from 'react';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

import modal from 'bootstrap/js/dist/modal';


class ModalPaid extends Component{
	constructor(props) {
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.saving = this.saving.bind(this);

		this.state = {
			total:"",
			id:"",
		};
	}

	componentDidMount() {
		this.props.onRef(this);

	}

	componentWillUnmount() {
		this.props.onRef(null)

	}

	handleClose() {
		$('#modal_reset').modal('hide');
		$('#modal_reset').removeClass('in');
		$('.modal-backdrop').remove();
		$('#modal_reset').css('display', 'none');
	}

	handleShow(id) {
		this.setState({id:id});
		$('#modal_reset').addClass('in');
		$('#modal_reset').css('display', 'block');
		$('#total').focus();
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	saving(e){
		e.preventDefault();

		if(this.state.total !== ""){
			this.props.general.waiting.handleShow('Terminando...');
			var obj = {				
				total:this.state.total,
				status:'paid'
			};
			fetch(this.props.general.api+'orders/'+this.state.id,{
				method:'put',
				body:JSON.stringify(obj),
				headers: new Headers({
					'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
					'Accept'		: 'application/json',
					'Content-Type'	: 'application/json'
				})
			}).then(res => {
				this.props.general.waiting.handleClose();
				if(res.ok){
					return res.json();
				}else{
					res.text().then((msg)=>{
						var error = JSON.parse(msg);

						if(error.message === 'Token has expired'){
							this.props.general.logout();
						}else{
							console.log(error);
						}
					});
				}
			}).then(response => {
				if(response !== undefined){
					this.handleClose();
					Swal.fire('Correcto!', 'El pedido fue terminado correctamente', 'success');
					this.props.refresh();

				}
			})
		}else{
			Swal.fire('Error!', 'Debe agregar un total', 'error');
		}
		
	}

	render(){
		return(
			<div className="modal fade" id="modal_reset" ref={el => this.el = el}>
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
          				<div className="modal-header">
            				<button type="button" className="close" data-dismiss="modal" aria-label="Close"
            					onClick={this.handleClose}>
              					<span aria-hidden="true">&times;</span>
              				</button>
            				<h4 className="modal-title">
            					Terminar Pedido
            				</h4>
          				</div>
          				<div className="modal-body">
            				<div className="row ">
            					<div className="col-xs-12 form-group">
            						<span>Total</span>
            						<input type="number" className="form-control input-sm" value={this.state.total} 
            							name="total" id="total" onChange={this.handleChange} />
            					</div>
            					<div className="col-xs-12" style={{textAlign:'center'}}>
            						<button className="btn btn-primary" style={{marginRight:'5px'}} onClick={this.saving}>Terminar</button>
            						<button className="btn btn-info" style={{marginLeft:'5px'}} onClick={this.handleClose}>Cancelar</button>
            					</div>
            				</div>
          				</div>
        			</div>
				</div>
			</div>
		)
	}
}

export default ModalPaid;