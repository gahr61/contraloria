//import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import React, {Component} from 'react';

class Login extends Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
		    show_alert: false,
		    message:"",

			user:"admin@admin.com",
			pass:"adminadmin",
		}
	}

	handleClose() {
		this.setState({ show: false});
	}

	handleShow(msg) {
		console.log(msg)
		this.setState({ show: true,message:msg});
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
		console.log(this.props)
		var  obj = {
			"email": this.state.user,
			"password": this.state.pass
		};
		this.props.general.waiting.handleShow('Iniciando...');
	
		fetch('api/auth/login',{
			method:'POST',
			body: JSON.stringify(obj),
			headers: new Headers({
				'Accept'		: 'application/json',
				'Content-Type' 	: 'application/json'
			})
		}).then(res => {
			this.props.general.waiting.handleClose();
			console.log(res.ok)
			if(res.ok){
				return res.json();
			}else{

				console.log('error '+res.text());
			}
		}).then(response => {
			if(response !== undefined){
				this.setState({show_alert:false});
				this.props.general.setToken(response.access_token);
			}else{
				this.setState({show_alert:true});

				setTimeout(()=>{
					this.setState({show_alert: false});
				}, 1000);
			}
		});
	}

	render(){
		return (
			<div className="login-box">
				<div className="login-logo"></div>
				<div className="login-box-body">
					<p className="login-box-msg">Inicio de sesion</p>
					<form>
						{this.state.show_alert ?
							<div className="alert alert-danger" role="alert">
  								Usuario y/o Contraseña incorrecta.
							</div>
						:null}
						<div className="form-group has-feedback">
        					<input type="email" className="form-control" 
        						placeholder="Email" value={this.state.user} 
        						onChange={this.handleChange}/>
        					<span className="glyphicon glyphicon-envelope form-control-feedback"></span>
	      				</div>
	      				<div className="form-group has-feedback">
	        				<input type="password" className="form-control" 
	        					placeholder="Password" value={this.state.pass} 
	        					onChange={this.handleChange} />
	        				<span className="glyphicon glyphicon-lock form-control-feedback"></span>
	     				</div>
	     				<div className="row" style={{textAlign:'right'}}>
					        <div className="col-xs-4">
					          	<button type="button" 
					          		data-toggle="modal"
									data-target="#modal"
					          		//data-show={this.props.general.waiting.state.show}
					          		className="btn btn-primary btn-block btn-flat"
					          		onClick={this.submitForm}
					          		>
					          		Entrar
					          	</button>
					        </div>
				      	</div>
					</form>
				</div>


			</div>
		)
	}
}

export default Login