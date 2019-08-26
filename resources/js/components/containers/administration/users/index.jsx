import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../../../general/title';
import Table from '../../../general/table';
import ModalReset from './modalReset';


class Users extends Component{
	constructor(props){
		super(props);

		this.getUser 	= this.getUser.bind(this);
		this.resetPass 	= this.resetPass.bind(this);
		this.editUser 	= this.editUser.bind(this);
		this.deleteUser = this.deleteUser.bind(this)

		this.state = {
			columns: [
				{title:'Nombre'},
				{title:'Correo'},
				{title:'Tipo'},
				{title:'Accion'},
			],
			data: [],
			actionButton: [
				{	btn: this.props.general.permissions.admin_users_reset, 
					name:'Reset Contraseña', 
					class:'btn btn-info btn-xs action-btn',
					icon:'fa fa-key',
					clickFn:'reset'
				},
				{	btn: this.props.general.permissions.admin_users_edit, 
					name:'Editar', 
					class:'btn btn-warning btn-xs action-btn', 
					icon:'fa fa-pencil',
					clickFn:'edit'
				},
				{	btn: this.props.general.permissions.admin_users_delete, 
					name:'Eliminar', 
					class:'btn btn-danger btn-xs', 
					icon:'glyphicon glyphicon-remove-circle action-btn',
					clickFn:'delete'
				},
			],
			message:"",
		}
	}

	componentDidMount(){
		this.setState({data:[]});
		setTimeout(()=>{
			this.getUser();
		}, 300);
		
	}

	getUser(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'user',{
			method:'get',
			headers: new Headers({
				'Autorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res => {
			this.props.general.waiting.handleClose();
			if(res.ok){
				return res.json();
			}else{
				console.log(res.text());
			}
		}).then(response => {
			if(response !== undefined){
				var data = []
				response.user.map((u)=>{
					data.push([
						u.name,
						u.email,
						'admin',
						u.id
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

	editUser(id){
		this.props.history.push('/users/'+id+'/edit');
	}

	deleteUser(id){
		fetch(this.props.general.api+'user/'+id,{
			method:'delete',
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json',
			})
		}).then(res => {
			if(res.ok){
				return res.json();
			}else{
				console.log(res.text());
			}
		}).then(response => {
			if(response !== undefined){
				//swal('Proceso terminado', response.mensaje, 'success');
				this.table.resetTable();
				this.getUser();
				
			}
		})		
	}

	resetPass(e, id){
		e.preventDefault();
		this.modal_reset.handleShow(id);
	}

	render(){
		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							{this.props.general.permissions.admin_users_new ? 
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
								edit 	= {this.editUser}
								delete 	= {this.deleteUser}
								getList = {this.getUser}
								reset 	= {this.resetPass}
								onRef 	= {ref => (this.table = ref)}
								filter  = {false}/>
						</div>
					</div>
				</div>

				<ModalReset {...this.props} onRef={ref => this.modal_reset = ref} />
			</div>
		)
	}
} 

export default Users;