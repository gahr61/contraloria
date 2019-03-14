//import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import React, {Component} from 'react';

class Login extends Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);

		this.state = {
			user:"admin@admin.com",
			pass:"adminadmin",
		}
	}

	componentDidMount(){
		
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	submitForm(e){
		e.preventDefault();
		var  obj = {
			"email": this.state.user,
			"password": this.state.pass
		};
		fetch('api/auth/login',{
			method:'POST',
			body: JSON.stringify(obj),
			headers: new Headers({
				'Accept'		: 'application/json',
				'Content-Type' 	: 'application/json'
			})
		}).then(res => {
			if(res.ok){
				return res.json();
			}else{
				console.log('error '+res.text());
			}
		}).then(response => {
			if(response !== undefined){
				console.log(this.props.user)
				this.props.setToken(response.access_token);
			}
		});
	}

	render(){
		return (
			<div className="container" style={{marginTop:"10%"}}>
				<div className="row justify-content-md-center">
					<div className="col-xs-12 col-sm-7 col-lg-5">
						<div className="card xs-12 sm-7 lg-5">
							<div className="card-header">
								Login
							</div>
							<div className="card-body">
								<form >
									<div className="col-xs-12 form-group">
							    		<label className="col-xs-12 col-sm-4">Correo</label>
										<div className="col-xs-12 col-sm-8" style={{display:"inline-block"}}>
								    		<input type="email" className="form-control" 
								    			name="user" id="user" value={this.state.user}
								    			onChange={this.handleChange} />
								    	</div>		
							    	</div>
							    	<div className="col-xs-12 form-group">
							    		<label className="col-xs-12 col-sm-4">Contraseña</label>
							    		<div className="col-xs-12 col-sm-8" style={{display:"inline-block"}}>
							    			<input type="password" className="form-control" 
							    				name="pass" id="pass" value={this.state.pass}
								    			onChange={this.handleChange} />
							    		</div>	
							    	</div>
							    	<div className="col-xs-12" style={{textAlign:"right"}}>
							    		<button type="button" onClick={(e)=>this.submitForm(e)} className="btn btn-light">Entrar</button>
							    	</div>
						    	</form>
						  	</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

export default Login