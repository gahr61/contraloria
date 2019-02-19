import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import Routes from '../Routes';
import './App.css';

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
			<div>
			
		  		<div className="App">
					<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				    	<button className="navbar-toggler" type="button" 
				    		id="toggle-sidebar"
				    		data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
				      		<span className="navbar-toggler-icon"></span>
				    	</button>
				    	<Link className="navbar-brand col-6 col-sm-3 col-md-2 mr-0" 
				    		to="/" style={{padding:"0"}}>Company name</Link>
				  	</nav>  
		  	
		  			<div className="page-wrapper default-theme sidebar-bg bg1 toggled">
		  				<nav id="sidebar" className="sidebar-wrapper">
			            	<div className="sidebar-content">
			                	<div className=" sidebar-item sidebar-menu">
				                    <ul>
				                    	<li className="header-menu">
				                    		<Link to="/login">
				                                <span className="menu-text">login</span>
				                            </Link>
				                    	</li>
				                        <li>
				                        	<Link to="/clients">
				                                <span className="menu-text">Cliente</span>
				                            </Link>
				                        </li>
				                        <li>
				                        	<Link to="">
				                                <span className="menu-text">Servicios</span>
				                            </Link>
				                        </li>
				                        <li className="sidebar-dropdown">
				                           	<Link to="" replace={false}>
				                                <i className="fa fa-tachometer-alt"></i>
				                                <span className="menu-text">Inventario</span>
				                            </Link>
				                            <div className="sidebar-submenu">
				                                <ul>
				                                    <li>
				                                        <Link to="/about">Productos
				                                        </Link>
				                                    </li>
				                                    <li>
				                                        <Link to="/services">Entradas</Link>
				                                    </li>
				                                    <li>
				                                        <Link to="/contact">Salidas</Link>
				                                    </li>
				                                    
				                                </ul>
				                            </div>
				                        </li>
				                        <li className="sidebar-dropdown">
				                           	<Link to="#" replace={false}>
				                                <i className="fa fa-tachometer-alt"></i>
				                                <span className="menu-text">Limpieza</span>
				                            </Link>
				                            <div className="sidebar-submenu">
				                                <ul>
				                                    <li>
				                                        <Link to="/contact">Pedidos</Link>
				                                    </li>
				                                    <li>
				                                        <Link to="/contact">Notas</Link>
				                                    </li>
				                                    
				                                </ul>
				                            </div>
				                        </li>
				                        
				                    </ul>
				                </div>
			                </div>
			            </nav>

			            <main className="page-content pt-2">
		            		<div id="overlay" className="overlay"></div>
		            		
		            		<Routes childProps={childProps} />
		            	</main>
		  			</div>
				</div>
			
			</div>
		);
  	}
}

export default withRouter(App);
