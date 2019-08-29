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
		this.getUser = this.getUser.bind(this);
		this.onChecked = this.onChecked.bind(this);

		this.state = {
			name:"",
			email:"",
			password:"",
			rol_id:"",
			user_id:"",
			roles:[],
			companies:[],
			all_companies:false,
			company_select:[]
		}
	}

	componentDidMount(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'getRoles',{
			method:'get',
			headers: new Headers({
				'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res => {
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
				this.setState({roles:response});
			}
		});

		fetch(this.props.general.api + 'companies',{
			method:'get',
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
				response.company.map((c)=>{
					c.check = false;
				})
				this.setState({companies:response.company});
			}
		})


		if(this.props.match.params.id !== undefined){
			setTimeout(()=>{
				this.getUser();
			}, 300);
		}
	}

	getUser(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'user/'+this.props.match.params.id+'/edit',{
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
				var num = 0;
				this.state.companies.map((c)=>{
					var index = response.user.companies.findIndex(obj =>
						obj.id === c.id
					);

					if(index !== -1){
						c.check = true;
						num++;
					}
				})

				this.setState({
					name:response.user.name,
					email:response.user.email,
					password:"",
					rol_id:response.user.rol[0].id,
					user_id:response.user.id,
					all_companies: num === this.state.companies.length ? true : false
				})


				this.forceUpdate();
			}
		});
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	
		if(e.target.value !== ""){
			this.props.general.showCtrlError(e.target.name);
		}
	}

	saving(e){
		e.preventDefault();

		if(this.props.general.isValidForm()){
			var method = "";
			var url = "";
			var obj = {}
			var comp = [];
			this.state.companies.map((c)=>{
				if(this.state.all_companies){
					comp.push({company_id:c.id});
				}else{
					if(c.check){
						comp.push({company_id:c.id});
					}
				}
			})

			if(comp.length > 0){
				if(this.props.match.params.id === undefined){
					method = 'post';
					url = 'user';
					obj = {
						name: this.state.name,
						email: this.state.email,
						password: this.state.password,
						rol_id: this.state.rol_id,
						companies:comp
					}

				}else{
					method = 'put';
					url = 'user/'+this.props.match.params.id;
					obj = {
						id:this.state.user_id,
						name: this.state.name,
						email: this.state.email,
						rol_id: this.state.rol_id,
						companies:comp
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
						this.props.history.push('/users');
					}
				});
			}else{
				Swal.fire('Error!', 'Debe marcar por lo menos una empresa', 'error');
			}

				
		}else{
			Swal.fire('Error!','Los campos marcados son requeridos','error');
		}		
	}

	canceling(e){
		e.preventDefault();
		this.props.history.push('/users');
	}

	onChecked(e){
		if(e.target.name === 'all_check'){
			this.setState({
				all_companies: e.target.checked ? true : false
			})
			this.state.companies.map((c)=>{
				c.check = e.target.checked ? true : false
			});
			
		}else{
			this.state.companies.map((c)=>{
				c.id === parseInt(e.target.id) ?
					c.check = e.target.checked ? true : false
				:null
			});

			var num = 0;
			this.state.companies.map((c)=>{
				if(c.check){
					num++;
				}
			})

			if(num === this.state.companies.length){
				this.setState({all_companies:true});
			}else{
				this.setState({all_companies:false});
			}


		}

		this.forceUpdate();
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
											value={this.state.name} required
											onChange={this.handleChange} />
									</div>
									<div className="col-xs-12 form-group">
										<span>Correo</span>
										<input type="text" name="email" id="email" className="form-control input-sm"
											value={this.state.email} required
											onChange={this.handleChange} />
									</div> 
									{this.props.match.params.id === undefined ?
										<div className="col-xs-12 form-group">
											<span>Contraseña</span>
											<input type="password" name="password" id="password" 
												className="form-control input-sm" required onChange={this.handleChange} />
										</div>
									:null}
										
									<div className="col-xs-12 form-group">
										<span>Rol</span>
										<select className="form-control input-sm" id="rol_id" name="rol_id"
											value={this.state.rol_id} onChange={this.handleChange} required>
											<option value="">Selecciones...</option>
											{this.state.roles.map((rol, i)=>(
												<option key={i} value={rol.id}>{rol.display_name}</option>
											))}
										</select>
									</div>

									<div className="col-xs-12 form-group">
										<span>Empresas</span>
										<div className="col-xs-12">
											<input type="checkbox" name="all_check" checked={this.state.all_companies} onChange={this.onChecked} /> Todos
										</div>
										<div>
											{this.state.companies.map((c, i)=>(
												<div className="col-xs-12 col-sm-4" key={i}>
													<input type="checkbox" checked={c.check} id={c.id} onChange={this.onChecked} /> {c.name}
												</div>
											))}
										</div>
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