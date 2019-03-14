import React from 'react';
import Title from '../../../general/title';
import Table from '../../../general/table';

const columns = [
	{title:'Nombre'},
	{title:'Correo'},
	{title:'Tipo'},
	{title:'Accion'},
];

const data = [[
	'Ricardo',
	'ric@mail.com',
	'Admin',
	1
]];

const actionButton = [
	{btn: true, name:'Reset Contraseña', class:'btn btn-info',icon:'fa fa-key'},
	{btn: true, name:'Editar', class:'btn btn-warning', icon:'fa fa-pencil'},
	{btn: true, name:'Eliminar', class:'btn btn-danger', icon:'glyphicon glyphicon-remove-circle'},
	
]

const Users = (props)=>(
	<div>
		<Title {...props} />
		<div className="box box-default">
			<div className="box-body">
				<div className="row">
					<div className="col-xs-12 col-sm-1 form-group">
						<button type="button" className="btn btn-block btn-primary btn-sm">Nuevo</button>
					</div>

					<Table {...props} columns={columns} data={data} buttons={actionButton}/>
				</div>
			</div>
		</div>
	</div>
)

export default Users;