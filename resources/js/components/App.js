import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import Routes from '../Routes';
import WaitingModal from './general/waitingModal';

import {Modal, Button} from 'react-bootstrap';

import './App.css';

import Header from './general/header';
import LeftPanel from './general/leftpanel';

const Config = require('../api');

class App extends Component {
	constructor(props){
		super(props);

		this.setToken = this.setToken.bind(this);

		this.state = {
			authenticated: true,
			token:"",
			api:Config.default.api,
		}
	}

	componentDidMount(){
		if(!this.state.authenticated){
			this.props.history.push('/login')
			document.body.classList.remove('skin-blue');
			document.body.classList.remove('sidebar-mini');
			document.body.classList.add('hold-transition');
			document.body.classList.add('login-page');
		}else{
			document.body.classList.add('skin-blue');
			document.body.classList.add('sidebar-mini');
			document.body.classList.remove('hold-transition');
			document.body.classList.remove('login-page');
			this.props.history.push(this.props.location.pathname)
		}

		console.log( this.state)
		
	}

	/*componentDidUpdate(){
		if(this.props.location.pathname !== '/login'){
			if(this.state.authenticated){
				this.props.history.push('/login')
				document.body.classList.remove('skin-blue');
				document.body.classList.remove('sidebar-mini');
				document.body.classList.add('hold-transition');
				document.body.classList.add('login-page');
			}else{
				console.log('s')
				document.body.classList.add('skin-blue');
				document.body.classList.add('sidebar-mini');
				document.body.classList.remove('hold-transition');
				document.body.classList.remove('login-page');
				this.props.history.push('/')
			}
		}
			
	}*/

	setToken(t){
		document.body.classList.add('skin-blue');
		document.body.classList.add('sidebar-mini');
		document.body.classList.remove('hold-transition');
		document.body.classList.remove('login-page');

		this.setState({authenticated:true});
		this.props.history.push('/');
	}


  	render() {
  		const generalProps = {
  			authenticated 	: this.state.authenticated,
  			waiting 		: this.waiting_modal,
  			setToken 		: this.setToken,
  			api 			: this.state.api,
  		}

		return (
			<div>

				{this.state.authenticated ?
					<div className="wrapper">
					
			  			<Header />
			  		
			  			<LeftPanel />

				  		<div className="content-wrapper">
				  			<section className="content">
				  				<Routes general={generalProps} />
				  			</section>
				  		</div>

					</div>
				: <Routes general={generalProps}/>} 

				<WaitingModal {...this.props} onRef={ref => (this.waiting_modal = ref)}/>
			</div>
		);
  	}
}

export default withRouter(App);
