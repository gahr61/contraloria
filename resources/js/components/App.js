import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import Routes from '../Routes';
import WaitingModal from './general/waitingModal';

import {Modal, Button} from 'react-bootstrap';

import './App.css';

import Header from './general/header';
import LeftPanel from './general/leftpanel';
import Login from './auth/login';

const Config = require('../api');

class App extends Component {
	constructor(props){
		super(props);

		//this.setToken = this.setToken.bind(this);
		this.setValues = this.setValues.bind(this);
		this.logout = this.logout.bind(this);

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
		e.preventDefault();
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


  	render() {
  		const generalProps = {
  			authenticated 	: this.state.authenticated,
  			waiting 		: this.waiting_modal,
  			user 		    : this.state.user,
  			api 			: this.state.api,
  			permissions 	: this.state.permissions,
  			setValues  		: this.setValues,
  		}

		return (
			<div>
				
				<div className="wrapper">
					<Header />
	  			
	  				<LeftPanel logout={(e)=>this.logout} user={this.state.user} permissions={this.state.permissions} />

			  		<div className="content-wrapper">
			  			<section className="content">
			  				{this.state.authenticated ?
			  					<Routes general={generalProps} />
			  				:<Login general={generalProps} />}
			  			</section>
			  		</div>

				</div>
				

				<WaitingModal {...this.props} onRef={ref => (this.waiting_modal = ref)}/>
			</div>
		);
  	}
}

export default withRouter(App);
