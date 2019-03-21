import React, {Component} from 'react';
import Title from '../../../general/title';
import BtnsForm from '../../../general/btnsForm';

class Form extends Component{
	constructor(props){
		super(props);
		
		this.saving = this.saving.bind(this);
		this.canceling = this.canceling.bind(this);

		this.state = {
			name:"",
			email:"",
			password:"",
			rol_id:"",
			user_id:""
		}
	}

	saving(e){
		e.preventDefault();

		console.log('guardando');
	}

	canceling(e){
		e.preventDefault();
		console.log('cancelar');
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
										<input type="text" className="form-control input-sm" />
									</div>
									<div className="col-xs-12 form-group">
										<span>Correo</span>
										<input type="text" className="form-control input-sm" />
									</div>
									<div className="col-xs-12 form-group">
										<span>Contraseña</span>
										<input type="text" className="form-control input-sm" />
									</div>
									<div className="col-xs-12 form-group">
										<span>Rol</span>
										<input type="text" className="form-control input-sm" />
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