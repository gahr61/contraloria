import React from 'react';
import {Switch, Route} from 'react-router-dom';

import AppliedRoute from './AppliedRoute';

import Login from './components/auth/login';

{/*Arministration*/}
import Permissions from './components/containers/administration/permissions/';
import FormPermission from './components/containers/administration/permissions/form';

import Roles from './components/containers/administration/roles/';
import FormRole from './components/containers/administration/roles/form';


import Users from './components/containers/administration/users/';
import FormUser from './components/containers/administration/users/form';

{/*Companies*/}
import Companies from './components/containers/company/';
import FormCompany from './components/containers/company/form';


const Home = ()=>(
	<div style={{height:"100%"}}>
		<h1>Inicio</h1>
	</div>
)

export default (general)=>
	<Switch>
		<AppliedRoute path="/login" exact component={Login} props={general} />

		<AppliedRoute path="/" exact component={Home} />
		<AppliedRoute path="/permissions" exact component={Permissions} title="Permisos" props={general} />
		<AppliedRoute path="/permissions/new" exact component={FormPermission} title="Nuevo Permiso" props={general} />
		<AppliedRoute path="/permissions/:id/edit" exact component={FormPermission} title="Editar Permiso" props={general}/>
		
		<AppliedRoute path="/roles" exact component={Roles} title="Roles" props={general} />
		<AppliedRoute path="/roles/new" exact component={FormRole} title="Nuevo Rol" props={general} />
		<AppliedRoute path="/roles/:id/edit" exact component={FormRole} title="Editar Rol" props={general}/>
		
		<AppliedRoute path="/users" exact component={Users} title="Usuarios" props={general} />
		<AppliedRoute path="/users/new" exact component={FormUser} title="Nuevo Usuario" props={general} />
		<AppliedRoute path="/users/:id/edit" exact component={FormUser} title="Editar Usuario" props={general} />


		<AppliedRoute path="/companies" exact component={Companies} title="Empresas" props={general} />
		<AppliedRoute path="/companies/new" exact component={FormCompany} title="Nuevo Empresa" props={general} />
		<AppliedRoute path="/companies/:id/edit" exact component={FormCompany} title="Editar Empresa" props={general} />
	</Switch>;