import React, {Component} from 'react';
import Title from '../../../general/title';
import BtnsForm from '../../../general/btnsForm';

class Form extends Component{
	constructor(props){
		super(props);
		
		this.saving = this.saving.bind(this);
		this.canceling = this.canceling.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			name:"",
			email:"",
			password:"",
			rol_id:"",
			user_id:"",
			roles:[],
		}
	}

	componentDidMount(){
		fetch(this.props.general.api+'getRoles',{
			method:'get',
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('toke'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res => {
			if(res.ok){
				return res.json();
			}else{
				console.log(res.text());
			}
		}).then(response => {
			if(response !== undefined){
				this.setState({roles:response});
			}
		})
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	saving(e){
		e.preventDefault();

		var obj = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			rol_id: this.state.rol_id,
		}


		fetch(this.props.general.api+'user',{
			method:'get',
			//body:JSON.stringify(obj),
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('toke'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res => {
			if(res.ok){
				return res.json();
			}else{
				console.log(res.text());
			}
		}).then(response => {
			if(response !== undefined){
				console.log(response);
			}
		})
	}

	canceling(e){
		e.preventDefault();
		console.log('cancelar');
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
											onChange={this.handleChange} />
									</div>
									<div className="col-xs-12 form-group">
										<span>Correo</span>
										<input type="text" name="email" id="email" className="form-control input-sm"
											onChange={this.handleChange} />
									</div> 
									<div className="col-xs-12 form-group">
										<span>Contraseña</span>
										<input type="text" name="password" id="password" 
											className="form-control input-sm" onChange={this.handleChange} />
									</div>
									<div className="col-xs-12 form-group">
										<span>Rol</span>
										<select className="form-control input-sm" id="rol_id" name="rol_id"
											value={this.state.rol_id} onChange={this.handleChange}>
											<option value="">Selecciones...</option>
											{this.state.roles.map((rol, i)=>(
												<option key={i} value={rol.id}>{rol.display_name}</option>
											))}
										</select>
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