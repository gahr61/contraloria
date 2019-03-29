import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
			data: [],
			actionButton: [
				{	btn: true, 
					name:'Reset Contraseña', 
					class:'btn btn-info btn-xs action-btn',
					icon:'fa fa-key',
					clickFn:'reset'
				},
				{	btn: true, 
					name:'Editar', 
					class:'btn btn-warning btn-xs action-btn', 
					icon:'fa fa-pencil',
					clickFn:'edit'
				},
				{	btn: true, 
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
		this.getUser();
	}

	getUser(){
		this.props.general.waiting.handleShow('Iniciando...');
		fetch(this.props.general.api+'user',{
			method:'get',
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('toke'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res => {
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
					console.log(this.state.data);
					this.table.setTable();
				}, 500);
			}
		})
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

		this.forceUpdate();

		setTimeout(()=>{
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
								<Link to={`${this.props.match.url}/new`} className="btn btn-block btn-primary btn-sm">
									Nuevo
								</Link>
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