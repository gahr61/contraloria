import React, {Component} from 'react';
import Title from '../../general/title';
import BtnsForm from '../../general/btnsForm';

class Form extends Component{
	constructor(props){
		super(props);
		
		this.saving = this.saving.bind(this);
		this.canceling = this.canceling.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			client:"",
			direction:"",
			phone:"",
			company_id:"",
			companies:[],
			id:"",
		}
	}

	componentDidMount(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api + 'companies',{
			method:'get',
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json',
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
				this.setState({companies:response.company});
			}
		})
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	saving(e){
		e.preventDefault();

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
				company_id: this.state.company_id
			}

		}else{
			method = 'put';
			url = 'orders/'+this.props.match.params.id;
			obj = {
				id:this.state.id,
				client: this.state.client,
				direction: this.state.direction,
				phone: this.state.phone,
				company_id: this.state.company_id
			}
		}
			
		this.props.general.waiting.handleShow('Guardando...');
		fetch(this.props.general.api + url,{
			method:method,
			body:JSON.stringify(obj),
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json',
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
				//swal('Proceso terminado', response.mensaje, 'success');
				this.props.history.push('/orders');
			}
		})
	}

	canceling(e){
		e.preventDefault();
		this.props.history.push('/orders');
	}

	render(){
		return (
			<div>
				<Title {...this.props} />
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
										<input type="text" name="phone" id="phone" className="form-control input-sm"
											value={this.state.phone} onChange={this.handleChange} required/>
									</div>
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