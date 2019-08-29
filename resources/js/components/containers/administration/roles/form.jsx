import React, {Component} from 'react';
import Title from '../../../general/title';
import BtnsForm from '../../../general/btnsForm';
import Swal from 'sweetalert2';

class Form extends Component{
	constructor(props){
		super(props);
		
		this.saving = this.saving.bind(this);
		this.canceling = this.canceling.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getRole = this.getRole.bind(this);

		this.state = {
			name:"",
			display_name:"",
			description:"",
			id:"",
		}
	}

	componentDidMount(){
		if(this.props.match.params.id !== undefined){
			setTimeout(()=>{
				this.getRole();
			}, 300);
		}
	}

	getRole(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'roles/'+this.props.match.params.id+'/edit',{
			method:'get',
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
				this.setState({
					name:response.name,
					description:response.description,
					display_name:response.display_name,
					id:response.id
				});
			}
		});
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	saving(e){
		e.preventDefault();

		if(this.props.general.isValidForm()){
			var method = "";
			var url = "";
			var obj = {}
			if(this.props.match.params.id === undefined){
				method = 'post';
				url = 'roles';
				obj = {
					name: this.state.name,
					display_name: this.state.display_name,
					description: this.state.description
				}

			}else{
				method = 'put';
				url = 'roles/'+this.props.match.params.id;
				obj = {
					id:this.state.id,
					name: this.state.name,
					display_name: this.state.display_name,
					description: this.state.description,
				}
			}
				
			this.props.general.waiting.handleShow('Guardando...');
			fetch(this.props.general.api + url,{
				method:method,
				body:JSON.stringify(obj),
				headers: new Headers({
					'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
					'Accept'		: 'application/json',
					'Content-Type'	: 'application/json',
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
					//swal('Proceso terminado', response.mensaje, 'success');
					this.props.history.push('/roles');
				}
			})
		}else{
			Swal.fire('Error!','Los campos marcados son requeridos','error');
		}
	}

	canceling(e){
		e.preventDefault();
		this.props.history.push('/roles');
	}

	render(){
		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<form>
								<div className="col-xs-12 col-sm-6 col-sm-offset-3">
									<div className="col-xs-12 form-group">
										<span>Nombre</span>
										<input type="text" name="name" id="name" className="form-control input-sm"
											value={this.state.name} onChange={this.handleChange} />
									</div>
									<div className="col-xs-12 form-group">
										<span>Nombre a mostrar</span>
										<input type="text" name="display_name" id="display_name" className="form-control input-sm"
											value={this.state.display_name}	onChange={this.handleChange} />
									</div> 
									
									<div className="col-xs-12 form-group">
										<span>Descripción</span>
										<input type="text" name="description" id="description" value={this.state.description}
											className="form-control input-sm" onChange={this.handleChange} />
									</div>

									<BtnsForm 
										btnSave='Guardar'
										btnCancel='Cancelar'
										save={this.saving}
										cancel={this.canceling}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>
		)
	}			
}

export default Form;