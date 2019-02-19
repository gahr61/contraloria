import 'bootstrap/dist/css/bootstrap.css';

import React, {Component} from 'react';

class Login extends Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			user:"",
			pass:"",
		}
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	submitForm(){
		obj = {
			user: this.state.user,
			pass: this.state.pass
		};

		fetch(this.props.api+'login',{
			method:'POST',
			body: JSON.stringify(obj)
		}).then(res => {
			if(res.ok){
				return res.json();
			}else{
				console.log('error '+res.text());
			}
		}).then(response => {
			if(response !== undefined){
				this.props.setToken(response.access_token);
			}
		});
	}

	render(){
		return (
			<div className="container">
				<div className="col-xs-12 col-md-8 col-md-offset-2">
					<div className="login-panel panel panel-default">
                		<div className="panel-heading">Sistema Administrativo v1</div>
            			<div className="panel-body">
                			<form className="form-horizontal" onSubmit={this.submitForm}>
                    			<div className="col-lg-10 col-md-10">
                        			<div className="form-group">
                            			<label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>
                            			<div className="col-md-8">
                                			<input id="email" type="email" 
                                				className="form-control" name="email" 
                                				value={this.state.pass} autoFocus />
                            			</div>
                        			</div>

                        			<div className="form-group">
                            			<label htmlFor="password" className="col-md-4 control-label">Password</label>
                            			<div className="col-md-8">
                                			<input id="password" type="password" 
                                				className="form-control" name="password" 
                                				autoComplete="off" value={this.state.pass} />
                            			</div>
                        			</div>

                        			<div className="form-group">
                            			<div className="col-md-6 col-md-offset-4">
                                			<button type="submit" className="btn btn-primary">
                                    			<i className="fa fa-btn fa-sign-in"></i> Login
                                			</button>
                            			</div>
                        			</div>
                    			</div>
                        
               				</form>
            			</div>
            		</div>
				</div>
			</div>

		)
	}
}

export default Login