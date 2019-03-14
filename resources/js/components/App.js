import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import Routes from '../Routes';
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
		!this.state.authenticated ?
			this.props.history.push('/login')
		:this.props.history.push('/')
	}

	componentDidUpdate(){
		/*
		if(this.props.location.pathname !== '/login'){
			!this.state.authenticated ?
				this.props.history.push('/login')
			:this.props.history.push('/')
		}*/
			
	}


  	render() {
  		const childProps = {
  			authenticated: this.state.authenticated
  		}

		return (
			<div className="wrapper">
		  		<Header />

		  		<LeftPanel />
			</div>
		);
  	}
}

export default withRouter(App);
