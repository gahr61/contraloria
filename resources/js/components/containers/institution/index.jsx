import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../../general/title';
import Table from '../../general/table';

class Institucion extends Component{
	constructor(props){
		super(props);

		this.getInstitucion    = this.getInstitucion.bind(this);
		this.editInstitucion   = this.editInstitucion.bind(this);
		this.deleteInstitucion = this.deleteInstitucion.bind(this)

		this.state = {
			columns: [
				{title:'Nombre'},
				{title:'Accion'},
			],
			data: [],
			actionButton: [
				{	btn: true,//this.props.general.permissions.admin_users_edit, 
					name:'Editar', 
					class:'btn btn-warning btn-xs action-btn', 
					icon:'fa fa-pencil',
					clickFn:'edit'
				},
				{	btn: true, //this.props.general.permissions.admin_users_delete, 
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
			this.getInstitucion();
		}, 300);
		
	}

	getInstitucion(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'institucion',{
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
				response.institucion.map((u)=>{
					data.push([
						u.nombre,
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

	editInstitucion(id){
		this.props.history.push('/institucion/'+id+'/edit');
	}

	deleteInstitucion(id){
		this.props.general.waiting.handleShow('Eliminando...');
		fetch(this.props.general.api+'institucion/'+id,{
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
				this.getInstitucion();
				
			}
		})		
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
								edit 	= {this.editInstitucion}
								delete 	= {this.deleteInstitucion}
								getList = {this.getInstitucion}
								onRef 	= {ref => (this.table = ref)}
								filter  = {false}/>
						</div>
					</div>
				</div>

			</div>
		)
	}
} 

export default Institucion;