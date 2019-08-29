import React, {Component} from 'react';
import Title from '../../general/title';
import Table from '../../general/table';
import {Link} from 'react-router-dom';
import ModalPaid from './modalPaid';

class Orders extends Component{
	constructor(props){
		super(props);

		this.getUserCompany = this.getUserCompany.bind(this);
		this.getOrder = this.getOrder.bind(this);
		this.editOrder 	= this.editOrder.bind(this);
		this.deleteOrder = this.deleteOrder.bind(this);
		this.endOrder = this.endOrder.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.refresh = this.refresh.bind(this);

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
			companies:[],
			show_company:false,
			title_company:"",
		}
	}

	componentDidMount(){
		this.setState({data:[]});
		setTimeout(()=>{
			this.getUserCompany();
		}, 500);
	}

	getUserCompany(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'user_company',{
			method:'get',
			headers: new Headers({
				'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res => {
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
				if(response.companies.length > 1){
					if(response.companies.length === response.user_company.length){
						this.setState({show_company:true, company:'all'});
					}

					if(response.user_company.length === 1){
						var index = response.companies.findIndex(obj => 
							obj.id === response.user_company[0].id
						);

						this.setState({
							show_company:false, 
							company:response.companies[index].id,
							title_company:response.companies[index].name
						});
					}
				}

				this.setState({
					companies:response.companies,
				});

				setTimeout(()=>{
					this.getOrder();
				}, 500);
			}else{
				this.props.general.waiting.handleClose();
			}
		})
	}

	getOrder(){
		var cols = this.state.columns;
		if(this.state.company === 'all'){
			cols.splice(4, 0, {title:'Empresa'});
		}else{
			var index = cols.findIndex(obj => obj.title === 'Empresa');

			if(index !== -1){
				cols.splice(4, 1);
			}
			
		}

		this.setState({
			columns:cols
		});

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
				var data = [], obj = [];
				response.order.map((r)=>{
					obj = []
					obj.push(
						r.id,
						r.client,
						r.direction,
						r.phone,
						r.id
					)

					if(this.state.company === 'all'){
						obj.splice(4, 0, r.company);
					}else{
						var index = cols.findIndex(obj => obj.title === 'Empresa');
						
						if(index !== -1) obj.splice(4, 1);
					}

					data.push(obj);
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
		this.props.general.waiting.handleShow('Eliminando...');
		fetch(this.props.general.api+'orders/'+id,{
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
				this.refresh();
				
			}
		})
	}

	endOrder(id){
		this.modal_paid.handleShow(id);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value,
			title_company:e.target.value === 'all' ? '' : e.target.options[e.target.selectedIndex].text
		})


		setTimeout(()=>{
			this.props.general.waiting.handleShow('Cargando...');
			this.table.resetTable();
			this.getOrder();
		}, 500);
		
	}

	refresh(){
		this.table.resetTable();
		this.getOrder();
	}

	render(){
		return(
			<div>
				<Title {...this.props} company={this.state.title_company}/>

				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<div className="col-xs-12 form-group">
								
								{this.state.show_company ? 
									<div className="col-xs-12 col-sm-2">
										<span>Empresa</span>
										<select className="form-control input-sm" name="company" 
											value={this.state.company} onChange={this.handleChange}>
											<option value="all">TODOS</option>
											{this.state.companies.map((c, i)=>(
												<option key={i} value={c.id}>{c.name}</option>
											))}
										</select>
									</div>
								:null}
										
								
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

				<ModalPaid {...this.props} 
					onRef={ref => this.modal_paid = ref} 
					refresh={this.refresh} />
			</div>
		)
	}
}

export default Orders;