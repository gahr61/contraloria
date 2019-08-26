import React, {Component} from 'react';
import Title from '../../general/title';
import Table from '../../general/table';
import {Link} from 'react-router-dom';

class Orders extends Component{
	constructor(props){
		super(props);

		this.getOrder = this.getOrder.bind(this);
		this.editOrder 	= this.editOrder.bind(this);
		this.deleteOrder = this.deleteOrder.bind(this);
		this.endOrder = this.endOrder.bind(this);

		this.state = {
			columns: [
				{title:'id'},
				{title:'Cliente'},
				{title:'Dirección de entrega'},
				{title:'Numero de contacto'},
				{title:'Acción'}
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
				{	btn: true,// this.props.general.permissions.admin_roles_delete, 
					name:'Finalizar', 
					class:'btn btn-info btn-xs action-btn', 
					icon:'fa fa-check',
					clickFn:'ending'
				},
			],
			company:'all',
		}
	}

	componentDidMount(){
		this.setState({data:[]});
		setTimeout(()=>{
			this.getOrder();
		}, 500);
	}

	getOrder(){
		console.log(sessionStorage.getItem('token'))
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'orders?company='+this.state.company,{
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
				console.log(res.text());
			}
		}).then(response => {
			if(response !== undefined){
				console.log(response)
				var data = []
				response.order.map((r)=>{
					data.push([
						r.id,
						r.client,
						r.direction,
						r.phone,
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

	editOrder(id){
		this.props.history.push('/orders/'+id+'/edit');
	}

	deleteOrder(id){
		fetch(this.props.general.api+'orders/'+id,{
			method:'delete',
			headers: new Headers({
				'Autorization'	: 'Bearer '+sessionStorage.getItem('token'),
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
				this.getOrder();
				
			}
		})
	}

	endOrder(id){

	}

	render(){
		return(
			<div>
				<Title {...this.props} />

				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<div className="col-xs-12 form-group">
								<div className="col-xs-12 col-sm-2">
									<span>Empresa</span>
									<select className="form-control input-sm">
										<option value="all">TODOS</option>
									</select>
								</div>
								<div className="col-xs-12 col-sm-2" style={{marginTop:'20px'}}>
									<Link to={`${this.props.match.url}/new`} className="btn btn-block btn-primary btn-sm">
										Nuevo
									</Link>
								</div>
							</div>

							<Table {...this.props} 
								columns	= {this.state.columns} 
								data	= {this.state.data} 
								buttons	= {this.state.actionButton}
								edit 	= {this.editOrder}
								delete 	= {this.deleteOrder}
								ending  = {this.endOrder}
								getList = {this.getOrder}
								onRef 	= {ref => (this.table = ref)}
								filter  = {true}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Orders;