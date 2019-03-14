import React from 'react';
import {Switch, Route} from 'react-router-dom';

import AppliedRoute from './AppliedRoute';

import Login from './components/auth/login';

{/*Arministration*/}
import Users from './components/containers/administration/users/';




const Home = ()=>(
	<div style={{height:"100%"}}>
		<h1>Inicio</h1>
	</div>
)
const About = ()=>(
	<h1>Acerca</h1>
)
const Services = ()=>(
	<h1>Servicios</h1>
)

const Contact = ()=>(
	<h1>contacto</h1>
)

export default ()=>
	<Switch>
		<AppliedRoute path="/login" exact component={Login} />

		<AppliedRoute path="/" exact component={Home} />
		<AppliedRoute path="/permisions" exact component={About} />
		<AppliedRoute path="/roles" exact component={About} />
		<AppliedRoute path="/users" exact component={Users} title="Usuarios" />
		<AppliedRoute path="/articles" exact component={About} />
		<AppliedRoute path="/inventory" exact component={About} />
		<AppliedRoute path="/notes" exact component={About} />
	</Switch>;