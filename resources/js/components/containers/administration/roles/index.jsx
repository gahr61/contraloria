import React, {Component} from 'react';
import Title from '../../../general/title';
import Table from '../../../general/table';
import {Link} from 'react-router-dom';

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
				{	btn: true, 
					name:'Permisos', 
					class:'btn btn-success btn-xs action-btn',
					icon:null,
					clickFn:'assign'
				},
				{	btn: true, 
					name:'Editar', 
					class:'btn btn-warning btn-xs action-btn', 
					icon:'fa fa-pencil',
					clickFn:'edit'
				},
				{	btn: true, 
					name:'Eliminar', 
					class:'btn btn-danger btn-xs action-btn', 
					icon:'glyphicon glyphicon-remove-circle',
					clickFn:'delete'
				},
			]
		}
	}

	componentDidMount(){
		//this.table.setTable();
		this.getRoles();
		//this.table.resetTable();
		setTimeout(()=>{
			this.table.setTable();
		}, 500);
	}

	getRoles(){
	}

	editRole(id){
		console.log(id);
	}

	deleteRole(id){
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

	assignPermisions(id){
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
								<Link to={`${this.props.match.url}/new`} className="btn btn-block btn-primary btn-sm">
									Nuevo
								</Link>

							</div>

							<Table {...this.props} 
								columns	= {this.state.columns} 
								data	= {this.state.data} 
								buttons	= {this.state.actionButton}
								edit 	= {this.editRole}
								delete 	= {this.deleteRole}
								getList = {this.getRole}
								assign 	= {this.assignPermisions}
								onRef 	= {ref => (this.table = ref)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
} 

export default Roles;