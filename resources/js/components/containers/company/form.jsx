import React, {Component} from 'react';
import Title from '../../general/title';
import BtnsForm from '../../general/btnsForm';

class Form extends Component{
	constructor(props){
		super(props);
		
		this.saving = this.saving.bind(this);
		this.canceling = this.canceling.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getCompany = this.getCompany.bind(this);

		this.state = {
			name:"",
			id:"",
		}
	}

	componentDidMount(){
		if(this.props.match.params.id !== undefined){
			setTimeout(()=>{
				this.getCompany();
			}, 300);
		}
	}

	getCompany(){
		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'companies/'+this.props.match.params.id+'/edit',{
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
				this.setState({
					name:response.name,
					id:response.id
				});
			}
		});
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
			url = 'companies';
			obj = {
				name: this.state.name
			}

		}else{
			method = 'put';
			url = 'companies/'+this.props.match.params.id;
			obj = {
				id:this.state.id,
				name: this.state.name
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
				this.props.history.push('/companies');
			}
		})
	}

	canceling(e){
		e.preventDefault();
		this.props.history.push('/companies');
	}

	render(){
		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<form>
								<div className="col-xs-12 col-sm-6 col-sm-offset-3">
									<div className="col-xs-12 form-group">
										<span>Nombre</span>
										<input type="text" name="name" id="name" className="form-control input-sm"
											value={this.state.name} onChange={this.handleChange} />
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