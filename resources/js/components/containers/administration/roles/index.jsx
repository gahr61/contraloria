import React, {Component} from 'react';
import Title from '../../../general/title';
import Table from '../../../general/table';
import {Link} from 'react-router-dom';
import ModalPermissions from './modalPermissions';

import 'multiselect/css/multi-select.css';
import  MultiSelect from 'multiselect';

class Roles extends Component{
	constructor(props){
		super(props);

		this.getRoles 	= this.getRoles.bind(this);
		this.assignPermisions 	= this.assignPermisions.bind(this);
		this.editRole 	= this.editRole.bind(this);
		this.deleteRole = this.deleteRole.bind(this)

		this.state = {
			columns: [
				{title:'Nombre'},
				{title:'Nombre Mostrado'},
				{title:'Descripción'},
				{title:'Acción'},
			],
			data: [[
				'test',
				'test',
				'test',
				1
			],[
				'Paleleria',
				'papeleria',
				'Permite utilizar los modulos de papeleria',
				2
			]],
			actionButton: [
				{	btn: this.props.general.permissions.admin_roles_assign_permissions, 
					name:'Permisos', 
					class:'btn btn-success btn-xs action-btn',
					icon:null,
					clickFn:'assign'
				},
				{	btn: this.props.general.permissions.admin_roles_edit, 
					name:'Editar', 
					class:'btn btn-warning btn-xs action-btn', 
					icon:'fa fa-pencil',
					clickFn:'edit'
				},
				{	btn: this.props.general.permissions.admin_roles_delete, 
					name:'Eliminar', 
					class:'btn btn-danger btn-xs action-btn', 
					icon:'glyphicon glyphicon-remove-circle',
					clickFn:'delete'
				},
			]
		}
	}

	componentDidMount(){
		this.setState({data:[]});
		setTimeout(()=>{
			this.getRoles();
		}, 300);
	}

	getRoles(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'roles',{
			method:'get',
			headers: new Headers({
				'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res => {
			this.props.general.waiting.handleClose();
			if(res.ok){
				return res.json();
			}else{
				res.text().then((msg)=>{
					var error = JSON.parse(msg);

					if(error.message === 'Token has expired'){
						this.props.general.logout();
					}else{
						console.log(error);
					}
				});
			}
		}).then(response => {
			if(response !== undefined){
				var data = []
				response.role.map((r)=>{
					data.push([
						r.name,
						r.display_name,
						r.description,
						r.id
					])
				})
					
				this.setState({
					data: data
				});

				setTimeout(()=>{
					this.table.setTable();
				}, 500);
			}
		})
	}

	editRole(id){
		this.props.history.push('/roles/'+id+'/edit');
	}

	deleteRole(id){
		this.props.general.waiting.handleShow('Eliminando...');
		fetch(this.props.general.api+'roles/'+id,{
			method:'delete',
			headers: new Headers({
				'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json',
			})
		}).then(res => {
			this.props.general.waiting.handleClose();
			if(res.ok){
				return res.json();
			}else{
				res.text().then((msg)=>{
					var error = JSON.parse(msg);

					if(error.message === 'Token has expired'){
						this.props.general.logout();
					}else{
						console.log(error);
					}
				});
			}
		}).then(response => {
			if(response !== undefined){
				//swal('Proceso terminado', response.mensaje, 'success');
				this.table.resetTable();
				this.getRoles();
				
			}
		})
	}

	assignPermisions(id){
		this.modal_permissions.handleShow(id);
	}

	render(){
		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							{this.props.general.permissions.admin_roles_new?
								<div className="col-xs-12 col-sm-1 form-group">
									<Link to={`${this.props.match.url}/new`} className="btn btn-block btn-primary btn-sm">
										Nuevo
									</Link>
								</div>
							:null}

							<Table {...this.props} 
								columns	= {this.state.columns} 
								data	= {this.state.data} 
								buttons	= {this.state.actionButton}
								edit 	= {this.editRole}
								delete 	= {this.deleteRole}
								getList = {this.getRole}
								assign 	= {this.assignPermisions}
								onRef 	= {ref => (this.table = ref)}
								filter  = {false}/>
						</div>
					</div>
				</div>

				<ModalPermissions {...this.props} onRef={ref => this.modal_permissions = ref} />
			</div>
		)
	}
} 

export default Roles;