//import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import React, {Component} from 'react';

class Login extends Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);

		this.state = {
		    show_alert: false,
		    message:"",

			user:"sistemas@lacarreta.biz",
			pass:"s0p0rt3",
		}
	}

	componentDidMount(){
		$('body').addClass("hold-transition login-page");
		$('.main-header').css({height: '0px', top:'-60px'});
		$('.main-sidebar').css('width', '0px');
		$('.content-wrapper').css('margin-left', '0px');

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
			if(res.ok){
				return res.json();
			}else{
				return undefined;
			}
		}).then(response => {
			if(response !== undefined){
				sessionStorage.setItem("authenticated", true);
				sessionStorage.setItem("token", response.access_token);
				sessionStorage.setItem("permissions", JSON.stringify(response.permissions));
				sessionStorage.setItem("user", JSON.stringify(response.user));
				this.setState({show_alert:false});
				this.props.general.setValues(response);
			}else{
				setTimeout(()=>{
					this.props.general.waiting.handleClose();
				}, 100);
				setTimeout(()=>{
					this.setState({show_alert: true});
				}, 300);

				setTimeout(()=>{
					this.setState({show_alert: false});
				}, 3000);
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
        					<input type="email" className="form-control" name="user" id="user"
        						placeholder="Email" value={this.state.user} 
        						onChange={this.handleChange}/>
        					<span className="glyphicon glyphicon-envelope form-control-feedback"></span>
	      				</div>
	      				<div className="form-group has-feedback">
	        				<input type="password" className="form-control" name="pass" id="pass"
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