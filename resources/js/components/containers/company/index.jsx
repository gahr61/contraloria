import React, {Component} from 'react';
import Title from '../../general/title';
import Table from '../../general/table';
import {Link} from 'react-router-dom';

class Companies extends Component{
	constructor(props){
		super(props);

		this.editCompany 	= this.editCompany.bind(this);
		this.deleteCompany = this.deleteCompany.bind(this)

		this.state = {
			columns: [
				{title:'id'},
				{title:'Nombre'},
				{title:'Acción'},
			],
			data: [],
			actionButton: [
				{	btn: true,// this.props.general.permissions.admin_roles_edit, 
					name:'Editar', 
					class:'btn btn-warning btn-xs action-btn', 
					icon:'fa fa-pencil',
					clickFn:'edit'
				},
				{	btn: true,// this.props.general.permissions.admin_roles_delete, 
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
			this.getCompany();
		}, 300);
	}

	getCompany(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'companies',{
			method:'get',
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('toke'),
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
				response.company.map((r)=>{
					data.push([
						r.id,
						r.name,
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

	editCompany(id){
		this.props.history.push('/companies/'+id+'/edit');
	}

	deleteCompany(id){
		fetch(this.props.general.api+'companies/'+id,{
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
				this.getCompany();
				
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
							{/*this.props.general.permissions.admin_roles_new?*/}
								<div className="col-xs-12 col-sm-1 form-group">
									<Link to={`${this.props.match.url}/new`} className="btn btn-block btn-primary btn-sm">
										Nuevo
									</Link>
								</div>
							{/*:null*/}

							<Table {...this.props} 
								columns	= {this.state.columns} 
								data	= {this.state.data} 
								buttons	= {this.state.actionButton}
								edit 	= {this.editCompany}
								delete 	= {this.deleteCompany}
								getList = {this.getCompany}
								onRef 	= {ref => (this.table = ref)}
								filter  = {true}/>
						</div>
					</div>
				</div>

			</div>
		)
	}
} 

export default Companies;