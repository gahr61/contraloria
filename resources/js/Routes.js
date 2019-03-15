import React from 'react';
import {Switch, Route} from 'react-router-dom';

import AppliedRoute from './AppliedRoute';

import Login from './components/auth/login';

{/*Arministration*/}
import Permissions from './components/containers/administration/permissions/';
import Roles from './components/containers/administration/roles/';
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

export default (general)=>
	<Switch>
		<AppliedRoute path="/login" exact component={Login} props={general} />

		<AppliedRoute path="/" exact component={Home} />
		<AppliedRoute path="/permissions" exact component={Permissions} title="Permisos" />
		<AppliedRoute path="/roles" exact component={Roles} title="Roles" />
		<AppliedRoute path="/users" exact component={Users} title="Usuarios" />
		<AppliedRoute path="/articles" exact component={About} />
		<AppliedRoute path="/inventory" exact component={About} />
		<AppliedRoute path="/notes" exact component={About} />
	</Switch>;