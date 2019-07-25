import React, {Component} from 'react';
import Title from '../../../general/title';
import BtnsForm from '../../../general/btnsForm';

class Form extends Component{
	constructor(props){
		super(props);
		
		this.saving = this.saving.bind(this);
		this.canceling = this.canceling.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getRoles = this.getRoles.bind(this);

		this.state = {
			name:"",
			display_name:"",
			description:"",
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
		fetch(this.props.general.api+'roles/'+this.props.match.params.id,{
			method:'get',
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('toke'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res => {
			this.props.general.waiting.handleClose();
			if(res.ok){
				return res.json();
			}else{
				console.log(res.text());
			}
		}).then(response => {
			if(response !== undefined){
				/*this.setState({
					name:response.user.name,
					email:response.user.email,
					password:"",
					rol_id:response.user.rol[0].id,
					user_id:response.user.id,
				})*/
			}
		});
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	saving(e){
		e.preventDefault();

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
			url = 'roles/update/'+this.props.match.params.id;
			obj = {
				id:this.state.user_id,
				name: this.state.name,
				display_name: this.state.email,
				description: this.state.rol_id,
			}
		}
			
		this.props.general.waiting.handleShow('Guardando...');
		fetch(this.props.general.api + url,{
			method:method,
			body:JSON.stringify(obj),
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json',
			})
		}).then(res => {
			this.props.general.waiting.handleClose();
			if(res.ok){
				return res.json();
			}else{
				console.log(res.text());
			}
		}).then(response => {
			if(response !== undefined){
				console.log(response);
				//swal('Proceso terminado', response.mensaje, 'success');
				this.props.history.push('/roles');
			}
		})
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