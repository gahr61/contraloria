import React, {Component} from 'react';
import Title from '../../../general/title';
import Table from '../../../general/table';

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
			data: [[
				'Ricardo',
				'ric@mail.com',
				'Admin',
				1
			],[
				'Saul',
				'saul@mail.com',
				'Admin',
				2
			]],
			actionButton: [
				{	btn: true, 
					name:'Reset Contraseña', 
					class:'btn btn-info btn-xs',
					icon:'fa fa-key',
					clickFn:'reset'
				},
				{	btn: true, 
					name:'Editar', 
					class:'btn btn-warning btn-xs', 
					icon:'fa fa-pencil',
					clickFn:'edit'
				},
				{	btn: true, 
					name:'Eliminar', 
					class:'btn btn-danger btn-xs', 
					icon:'glyphicon glyphicon-remove-circle',
					clickFn:'delete'
				},
			]
		}
	}

	componentDidMount(){
		//this.table.setTable();
		this.getUser();
		//this.table.resetTable();
		setTimeout(()=>{
			this.table.setTable();
		}, 500);
		
		
	}

	getUser(){

		
	}

	editUser(id){
		console.log(id);
	}

	deleteUser(id){
		console.log(id);
		this.state.data.map((d, i)=>{
			d.map((v)=>{
				if(v === id){
					this.state.data.splice(i, 1);
				}
			})
		})

		console.log(this.state.data)
		this.forceUpdate();


		
		setTimeout(()=>{
			console.log(this.state.data.length)
			if(this.state.data.length === 0){
				this.table.resetTable()
			}
		}, 100);

		
			
	}

	resetPass(id){
		console.log(id);
	}

	render(){
		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<div className="col-xs-12 col-sm-1 form-group">
								<button type="button" className="btn btn-block btn-primary btn-sm">Nuevo</button>
							</div>

							<Table {...this.props} 
								columns	= {this.state.columns} 
								data	= {this.state.data} 
								buttons	= {this.state.actionButton}
								edit 	= {this.editUser}
								delete 	= {this.deleteUser}
								getList = {this.getUser}
								reset 	= {this.resetPass}
								onRef 	= {ref => (this.table = ref)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
} 

export default Users;