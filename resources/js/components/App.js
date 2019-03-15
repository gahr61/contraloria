import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import Routes from '../Routes';
import WaitingModal from './general/waitingModal';
//import './App.css';

import Header from './general/header';
import LeftPanel from './general/leftpanel';

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			authenticated: false
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


  	render() {
  		const generalProp = {
  			authenticated: this.state.authenticated,
  			waiting: this.waiting_modal,
  		}

		return (
			<div>
				{this.state.authenticated ?
					<div className="wrapper">
					
			  			<Header />
			  		
			  			<LeftPanel />

				  		<div className="content-wrapper">
				  			<section className="content">
				  			{console.log(childProps)}
				  				<Routes childProps={childProps} />
				  			</section>
				  		</div>

					</div>
				: <Routes general={generalProp}/>}
				
				<WaitingModal {...this.props} onRef={ref => (this.waiting_modal = ref)}/>
			</div>
		);
  	}
}

export default withRouter(App);
