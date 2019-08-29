import React, {Component} from 'react';
import Title from '../../general/title';
import BtnsForm from '../../general/btnsForm';
import Swal from 'sweetalert2';

class Form extends Component{
	constructor(props){
		super(props);
		
		this.saving = this.saving.bind(this);
		this.canceling = this.canceling.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getUserCompany = this.getUserCompany.bind(this);
		this.getOrder = this.getOrder.bind(this);

		this.state = {
			client:"",
			direction:"",
			phone:"",
			company_id:"",
			companies:[],
			id:"",
			show_company:false,
			title_company:""
		}
	}

	componentDidMount(){
		this.getUserCompany();

		if(this.props.match.params.id !== undefined){
			setTimeout(()=>{
				this.getOrder();
			}, 300);
		}
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
				if(response.companies.length > 1){
					if(response.companies.length === response.user_company.length){
						this.setState({show_company:true});
					}

					if(response.user_company.length === 1){
						var index = response.companies.findIndex(obj => 
							obj.id === response.user_company[0].id
						);

						this.setState({
							show_company:false, 
							company_id:response.companies[index].id,
							title_company:response.companies[index].name
						});
					}
				}

				this.setState({
					companies:response.companies,
				});

			}
		})
	}

	getOrder(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'orders/'+this.props.match.params.id+'/edit',{
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

				this.setState({
					client:response.order.client,
					company_id:response.order.company_id,
					direction:response.order.direction,
					phone:response.order.phone,
					id: response.order.id
				});
			}
		});
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});

		if(e.target.value !== ""){
			this.props.general.showCtrlError(e.target.name);
		}
	}

	saving(e){
		e.preventDefault();

		if(this.props.general.isValidForm()){
			var method = "";
			var url = "";
			var obj = {}
			if(this.props.match.params.id === undefined){
				method = 'post';
				url = 'orders';
				obj = {
					client: this.state.client,
					direction: this.state.direction,
					phone: this.state.phone,
					company_id: this.state.company_id,
					status:'open',
				}

			}else{
				method = 'put';
				url = 'orders/'+this.props.match.params.id;
				obj = {
					id:this.state.id,
					client: this.state.client,
					direction: this.state.direction,
					phone: this.state.phone,
					company_id: this.state.company_id,
					status:'open',
				}
			}
				
			this.props.general.waiting.handleShow('Guardando...');
			fetch(this.props.general.api + url,{
				method:method,
				body:JSON.stringify(obj),
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
					this.props.history.push('/orders');
				}
			})
		}else{
			Swal.fire('Error!','Los campos marcados son requeridos','error');
		}
	}

	canceling(e){
		e.preventDefault();
		this.props.history.push('/orders');
	}

	render(){
		return (
			<div>
				<Title {...this.props} company={this.state.title_company} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<form>
								<div className="col-xs-12 form-group">
									<span>Llene los datos de su pedido (*)</span>
								</div>
								<div className="col-xs-12 col-sm-6 col-sm-offset-3">
									<div className="col-xs-12 form-group">
										<span>Nombre de cliente *</span>
										<input type="text" name="client" id="client" className="form-control input-sm"
											value={this.state.client} onChange={this.handleChange} required/>
									</div>
									<div className="col-xs-12 form-group">
										<span>Dirección (*)</span>
										<input type="text" name="direction" id="direction" className="form-control input-sm"
											value={this.state.direction} onChange={this.handleChange} required/>
									</div>
									<div className="col-xs-12 form-group">
										<span>Telefono de contacto (*)</span>
										<input type="number" name="phone" id="phone" className="form-control input-sm"
											value={this.state.phone} onChange={this.handleChange} required/>
									</div>
									{this.state.show_company ? 
										<div className="col-xs-12 form-group">
											<span>Empresa de reparto (*)</span>
											<select className="form-control" name="company_id" id="company_id"
												value={this.state.company_id} onChange={this.handleChange} required>
												<option value="">Seleccione...</option>
												{this.state.companies.map((c, i)=>(
													<option key={i} value={c.id}>
														{c.name}
													</option>
												))}
											</select>
										</div>
									:null}
										

									<BtnsForm 
										btnSave='Guardar'
										btnCancel='Cancelar'
										save={this.saving}
										cancel={this.canceling}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>
		)
	}			
}

export default Form;