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

import Institucion from './components/containers/institution/';
import FormInstitucion from './components/containers/institution/form';

{/*captura*/}
import Matriz from './components/containers/information_load/matriz';
import PTCI from './components/containers/information_load/ptci';
import Report from './components/containers/progress_reports/report';

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

		<AppliedRoute path="/institucion" exact component={Institucion} title="Institución" props={general} />
		<AppliedRoute path="/institucion/new" exact component={FormInstitucion} title="Nueva Institución" props={general} />
		<AppliedRoute path="/institucion/:id/edit" exact component={FormInstitucion} title="Editar Institución" props={general}/>
		
		<AppliedRoute path="/users" exact component={Users} title="Usuarios" props={general} />
		<AppliedRoute path="/users/new" exact component={FormUser} title="Nuevo Usuario" props={general} />
		<AppliedRoute path="/users/:id/edit" exact component={FormUser} title="Editar Usuario" props={general} />

		<AppliedRoute path="/matriz_evaluacion" exact component={Matriz} title="SCII Matriz de Evaluación" props={general} />
		
		<AppliedRoute path="/ptci_institucional" exact component={PTCI} title="PTCI Institucional" props={general} />
		<AppliedRoute path="/ptci_especifico" exact component={PTCI} title="PTCI Procesos Especificos" props={general} />
		
		<AppliedRoute path="/reporte_institucional" exact component={Report} title="Reporte Avance Institucional" props={general} />
		<AppliedRoute path="/reporte_especifico" exact component={Report} title="Reporte Procesos Avance Especificos" props={general} />

		

	</Switch>;