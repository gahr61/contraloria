import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import Routes from '../Routes';
import WaitingModal from './general/waitingModal';

import {Modal, Button} from 'react-bootstrap';

import './App.css';

import Header from './general/header';
import LeftPanel from './general/leftpanel';
import Login from './auth/login';
import ModalReset from './containers/administration/users/modalReset';

const Config = require('../api');

class App extends Component {
	constructor(props){
		super(props);

		//this.setToken = this.setToken.bind(this);
		this.setValues = this.setValues.bind(this);
		this.logout = this.logout.bind(this);
		this.resetPass = this.resetPass.bind(this);
		this.isValidForm = this.isValidForm.bind(this);
		this.showCtrlError = this.showCtrlError.bind(this);

		this.state = {
			authenticated: false,
			token:"",
			api:Config.default.api,
			permissions:{},
			user:{}
		}
	}

	async componentDidMount(){
		var authenticated = sessionStorage.getItem('authenticated');
		if(authenticated){
			this.setState({
				authenticated:true, 
				token:sessionStorage.getItem('token'),
				permissions:JSON.parse(sessionStorage.getItem('permissions')),
				user:JSON.parse(sessionStorage.getItem('user'))
			});

			$('body').removeClass("login-page");
			$('.main-header').removeAttr('style');
			$('.main-sidebar').removeAttr('style');
			$('.content-wrapper').css('margin-left', '');
		}else{
			this.props.history.push('/login');
		}
	}

	logout(e){
		if(e !== undefined){
			e.preventDefault();
		}else{
			$('body').addClass("hold-transition login-page");
			$('.main-header').css({height: '0px', top:'-60px'});
			$('.main-sidebar').css('width', '0px');
			$('.content-wrapper').css('margin-left', '0px');
		}
		
		this.setState({
			authenticated: false,
			token: "",
			permissions:{},
			user:{}
		});
		sessionStorage.clear();
		this.props.history.push('/login')
	}

	setValues(item){
		this.setState({
			authenticated: true,
			token: item.access_token,
			permissions:item.permissions,
			user:item.user
		});

		$('body').removeClass("login-page");
		$('.main-header').removeAttr('style');
		$('.main-sidebar').removeAttr('style');
		$('.content-wrapper').css('margin-left', '');
		/*document.body.classList.add('skin-blue');
		document.body.classList.add('sidebar-mini');
		document.body.classList.remove('hold-transition');
		document.body.classList.remove('login-page');*/

		this.props.history.push('/');
	}

	resetPass(e){
		e.preventDefault();
		var id = this.state.user.id;
		this.modal_reset.handleShow(id);
	}

	isValidForm() {
		const inputs = document.querySelectorAll('select,input');
	    let isFormValid = true;
	    
	    inputs.forEach(input => {
	    	if(input.required){
    			const isInputValid = this.showCtrlError(input.name);
		      	if (!isInputValid) {
		        	isFormValid = false;
		    	}	   
		  	}
	    });
	    
	    return isFormValid;
	}

	showCtrlError(refName) {
		var res = null;
		var control = document.getElementById(refName);
	
		if (control.value === "") {
			if(control !== null){
				control.parentNode.classList.add('has-error');
			}
			res = false;
		} else{
			if(control !== null){
				if(control.required && control.parentNode.className.includes('has-error')){
					control.parentNode.classList.remove('has-error');
				}
			}
			res = true;
		}
		
		return res;
	}


  	render() {
  		const generalProps = {
  			authenticated 	: this.state.authenticated,
  			waiting 		: this.waiting_modal,
  			user 		    : this.state.user,
  			api 			: this.state.api,
  			permissions 	: this.state.permissions,
  			setValues  		: this.setValues,
  			isValidForm 	: this.isValidForm,
  			showCtrlError 	: this.showCtrlError,
  			logout 			: this.logout,
  		}

		return (
			<div>
				
				<div className="wrapper">
					<Header logout={(e)=>this.logout} reset={(e)=>this.resetPass} user={this.state.user}/>
	  			
	  				<LeftPanel user={this.state.user} permissions={this.state.permissions} />

			  		<div className="content-wrapper">
			  			<section className="content">
			  				{this.state.authenticated ?
			  					<Routes general={generalProps} />
			  				:<Login general={generalProps} />}
			  			</section>
			  		</div>

				</div>
				
				<ModalReset {...this.props} onRef={ref => this.modal_reset = ref} />
				<WaitingModal {...this.props} onRef={ref => (this.waiting_modal = ref)}/>
			</div>
		);
  	}
}

export default withRouter(App);
