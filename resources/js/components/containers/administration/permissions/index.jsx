import React, {Component} from 'react';
import Title from '../../../general/title';
import Table from '../../../general/table';

class Permissions extends Component{
	constructor(props){
		super(props);

		this.getPermissions 	= this.getPermissions.bind(this);
		
		this.state = {
			columns: [
				{title:'Nombre'},
				{title:'Nombre mostrado'},
				{title:'Descripción'},
			],
			data: [],
			actionButton: [/*{	
				btn: true, 
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
			}*/]
		}
	}

	UNSAFE_componentWillMount(){
		this.setState({data:[]});
		setTimeout(()=>{
			this.getPermissions();
		}, 300);		
	}

	getPermissions(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'permissions',{
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
				response.permission.map((r)=>{
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

	render(){
		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<Table {...this.props} 
								columns	= {this.state.columns} 
								data	= {this.state.data} 
								buttons	= {this.state.actionButton}
								onRef 	= {ref => (this.table = ref)}
								filter  = {true} />
						</div>
					</div>
				</div>
			</div>
		)
	}
} 

export default Permissions;