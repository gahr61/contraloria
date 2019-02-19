import React from 'react';
import {Switch} from 'react-router-dom';
import AppliedRoutes from './components/AppliedRoutes';

import Home from './components/home';
import Clients from './components/clients/index';


const About = ()=>(
	<h1>Acerca</h1>
)
const Services = ()=>(
	<h1>Servicios</h1>
)
const Contact = ()=>(
	<h1>Contacto</h1>
)
const Login = ()=>(
	<div className="container" style={{marginTop:"10%"}}>
		<div className="row justify-content-md-center">
			<div className="col-xs-12 col-sm-7 col-lg-5">
				<div className="card xs-12 sm-7 lg-5">
					<div className="card-header">
						Login
					</div>
					<div className="card-body">
						<form>
							<div className="col-xs-12 form-group">
					    		<label className="col-xs-12 col-sm-4">Correo</label>
								<div className="col-xs-12 col-sm-8" style={{display:"inline-block"}}>
						    		<input type="email" className="form-control" />
						    	</div>		
					    	</div>
					    	<div className="col-xs-12 form-group">
					    		<label className="col-xs-12 col-sm-4">Contraseña</label>
					    		<div className="col-xs-12 col-sm-8" style={{display:"inline-block"}}>
					    			<input type="password" className="form-control" />
					    		</div>	
					    	</div>
					    	<div className="col-xs-12" style={{textAlign:"right"}}>
					    		<button type="button" className="btn btn-light">Entrar</button>
					    	</div>
				    	</form>
				  	</div>
				</div>
			</div>
		</div>
	</div>
)


export default ({childProps})=>
	<Switch>
		<AppliedRoutes path="/" exact component={Home} props={childProps} />
		<AppliedRoutes path="/clients" exact component={Clients} props={childProps} />
		<AppliedRoutes path="/login" exact component={Login} props={childProps} />
		<AppliedRoutes path="/about" exact component={About} props={childProps} />
		<AppliedRoutes path="/services" exact component={Services} props={childProps} />
		<AppliedRoutes path="/contact" exact component={Contact} props={childProps} />
	</Switch>;