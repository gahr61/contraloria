import React, {Component} from 'react';
import * as $ from 'jquery';

import modal from 'bootstrap/js/dist/modal';

class ModalReset extends Component{
	constructor(props) {
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.saving = this.saving.bind(this);

		this.state = {
		    pass1:"",
		    pass2:"",
		    user_id:""
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
		this.setState({user_id:id});
		$('#modal_reset').addClass('in');
		$('#modal_reset').css('display', 'block');
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	saving(e){
		e.preventDefault();

		var error = 0;

		if(this.state.pass1 === ""){
			$('#pass1').addClass('error');
			error++;
		}else{
			$('#pass1').removeClass('error');
		}

		if(this.state.pass2 === ""){
			$('#pass2').addClass('error');
			error++;
		}else{
			$('#pass2').removeClass('error');
		}

		if(error === 0){
			if(this.state.pass1 === this.state.pass2){
				var obj = {password:this.state.pass1};

				this.props.general.waiting.handleShow('Guardando...');
				fetch(this.props.general.api+'user/reset_password/'+this.state.user_id, {
					method:'POST',
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
						alert(response.mensaje);
					}
				});
			}else{

				
			}
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
            					Reset Contraseña
            				</h4>
          				</div>
          				<div className="modal-body">
            				<div className="row ">
            					<div className="col-xs-12 form-group">
            						<span>Contraseña</span>
            						<input type="password" className="form-control input-sm" value={this.pass1} 
            							name="pass1" id="pass1" onChange={this.handleChange} />
            					</div>
            					<div className="col-xs-12 form-group">
            						<span>Confirma Contraseña</span>
            						<input type="password" className="form-control input-sm" value={this.pass2} 
            							name="pass2" id="pass2" onChange={this.handleChange} />
            					</div>
            					<div className="col-xs-12" style={{textAlign:'center'}}>
            						<button className="btn btn-primary" style={{marginRight:'5px'}} onClick={this.saving}>Guardar</button>
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

export default ModalReset;