import Swal from 'sweetalert2';
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import Title from '../../general/title';
import BtnsForm from '../../general/btnsForm';

import MultiSelect from "@khanacademy/react-multi-select";

const $ = require('jquery')

class Matriz extends Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.addProccess = this.addProccess.bind(this);
		this.selectEvaluacion = this.selectEvaluacion.bind(this);
		this.eliminaProceso = this.eliminaProceso.bind(this);

		this.state = {
			ejercicio:"",
			ejercicios:[],
			criterio:"",
			criterios:[],
			institucion:"",
			instituciones:[],
			proccess_name:"",
			proccess_type:"Administrativo",
			matriz_id:"",
			evaluation_crit:[],
			evaluation_selected:[],
			responsable_unit:"",
			responsable_person:"",
			procesos:[]
		}
	}

	componentDidMount(){
		//get ejercicios
		fetch(this.props.general.api+'ejercicio',{
			method:'get',
			headers: new Headers({
				'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json',
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
				this.setState({ejercicios:response.ejercicio});
			}
		});

		//get instituciones
		fetch(this.props.general.api+'institucion',{
			method:'get',
			headers: new Headers({
				'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json',
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
				this.setState({instituciones:response.institucion});
			}
		});

		//get criterios de evaluacion
		fetch(this.props.general.api+'criterio_evaluacion',{
			method:'get',
			headers: new Headers({
				'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json',
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
				var criterios = [];
				response.criterio.map((c)=>{
					criterios.push({label:c.criterio, value:c.id});
				})

				this.setState({criterios:criterios});


               
			}
		});

		this.getMatriz();
		
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	getMatriz(){
		//verifica si la matriz fue guardada
		var user = JSON.parse(sessionStorage.getItem('user'));
	
		fetch(this.props.general.api+'matriz/'+user.id, {
			method: 'get',
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
					console.log(msg);
				});
			}
		}).then(response => {
			if(response !== undefined){
				var matriz = response.user.matriz;
				if(matriz.length > 0){

					this.setState({
						ejercicio:matriz[0].id_ejercicio,
						institucion:matriz[0].id_institucion,
						matriz_id:matriz[0].id,
						procesos:matriz[0].proceso
					})
				}
			}
		})
	}

	addProccess(e){
		e.preventDefault();

		var user = JSON.parse(sessionStorage.getItem('user'));	

		var obj = {
			user_id:user.id,
			ejercicio:this.state.ejercicio,
			institucion:this.state.institucion,
			proceso:{
				nombre:this.state.proccess_name,
				tipo:this.state.proccess_type,
				criterios:this.state.evaluation_selected,
				total:this.state.evaluation_selected.length,
				unidad:this.state.responsable_unit,
				persona:this.state.responsable_person,
			},
			
		}

		if(this.state.matriz_id !== ""){
			obj.id_matriz =  this.state.matriz_id;
		}

		if(this.props.general.isValidForm()){
			if(obj.proceso.criterios.length > 0){
				this.props.general.waiting.handleShow('Guardando...');
				fetch(this.props.general.api+'matriz',{
					method:'Post',
					body:JSON.stringify(obj),
					headers: new Headers({
						'Authorization' : 'Bearer '+sessionStorage.getItem('token'),
						'Accept'		: 'application/json',
						'Content-Type'	: 'application/json'
					})
				}).then(res => {
					this.props.general.waiting.handleClose();
					if(res.ok){
						return res.json();
					}else{
						console.log(res);
					}
				}).then(response => {
					if(response !== undefined){
						this.setState({
							matriz_id:response.id_matriz,
							proccess_name:"",
							proccess_type:"Administrativo",
							evaluation_selected:[],
							responsable_unit:"",
							responsable_person:"",
							procesos:[...this.state.procesos, response.proceso]
						});
					}
				})
			}else{
				Swal.fire('Error', 'Debe seleccionar un criterio de evaluación');
			}
		}else{
			Swal.fire('Error', 'Campos incompletos', 'error');
		}

	}

	selectEvaluacion(selected){
		this.setState({evaluation_selected:selected});
	}

	eliminaProceso(id){
		Swal.fire({
			title:'Esta seguro?',
			text: 'Realmente desea eliminar el proceso',
			type: 'error',
			showCancelButton:true,
			confirmButtonColor:'#3085d6',
			cancelButtonColor:'#d33',
			confirmButtonText:'Si, eliminar',
		}).then((result)=>{
			if(result.value){
				this.props.general.waiting.handleShow('Eliminando...');
				fetch(this.props.general.api+'proceso_prior/'+id,{
					method:'delete',
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
							Swal.fire('Error', msg, 'error');
						});
					}
				}).then(response => {
					if(response !== undefined){
						Swal.fire('Eliminado', 'El proceso ha sido eliminado', 'success');
						this.getMatriz();
					}
				})
			}
		});
	}	

	render(){
		const {evaluation_selected} = this.state;

		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<form>
								<div className="col-xs-12 form-group">
									<h4>Matriz de Evaluación de Procesos Especificos</h4>

									<div className="col-xs-12">
										<div className="col-xs-12 col-sm-2">
											<span>Ejercicio</span>
											<select name="ejercicio" id="ejercicio" value={this.state.ejercicio}
												onChange={this.handleChange} className="form-control" required >
												<option value="">Seleccione...</option>
												{this.state.ejercicios.map((e, i)=>(
													<option key={i} value={e.id}>
														{e.ejercicio}
													</option>
												))}
											</select>
										</div>

										<div className="col-xs-12 col-sm-2">
											<span>Institución</span>
											<select name="institucion" id="institucion" value={this.state.institucion}
												onChange={this.handleChange} className="form-control" required>
												<option value="">Seleccione...</option>
												{this.state.instituciones.map((int, i)=>(
													<option key={i} value={int.id}>
														{int.nombre}
													</option>
												))}
											</select>
										</div>

									</div>

									<div className="col-xs-12">
										<fieldset>
											<legend>Procesos Prioritarios</legend>
											<div className="col-xs-12 form-group" style={{padding:'0'}}>
												<div className="col-xs-12 col-sm-3">
													<span>Nombre del Proceso</span>
													<input name="proccess_name" id="proccess_name" value={this.state.proccess_name}
														onChange={this.handleChange} className="form-control" required/>
												</div>
												<div className="col-xs-12 col-sm-2">
													<span>Tipo</span>
													<select name="proccess_type" id="proccess_type" value={this.state.proccess_type}
														onChange={this.handleChange} className="form-control" required>
														<option value="Administrativo">Administrativo</option>
														<option value="Sustantivo">Sustantivo</option>
													</select>
												</div>
												<div className="col-xs-12 col-sm-2">
													<span>Evaluación de Criterios</span>
													 <MultiSelect
													      options={this.state.criterios}
													      selected={this.state.evaluation_selected}
													      onSelectedChanged={evaluation_selected => this.selectEvaluacion(evaluation_selected)}
													      required
													    />
													
													{/*<select multiple name="evaluation_crit" id="evaluation_crit" value={this.state.evaluation_crit}
														onChange={this.handleChange} className="form-control">
														{this.state.criterios.map((crit, i)=>(
															<option key={i} value={crit.id}>
																{crit.criterio}
															</option>
														))}
													</select>*/}
												</div>
												<div className="col-xs-12 col-sm-2">
													<span>Unidad Responsable</span>
													<input name="responsable_unit" id="responsable_unit" value={this.state.responsable_unit}
														onChange={this.handleChange} className="form-control" required/>
												</div>
												<div className="col-xs-12 col-sm-2">
													<span>Persona Responsable</span>
													<input name="responsable_person" id="responsable_person" value={this.state.responsable_person}
														onChange={this.handleChange} className="form-control" required/>
												</div>
												<div className="col-xs-12 col-sm-1" style={{marginTop:'18px'}}>
													<button className="btn btn-info" onClick={this.addProccess}>Agregar</button>
												</div>
											</div>
											
											<hr style={{width:'90%'}}/>

											<div className="col-xs-12">
												<table className="table table-hover">
													<thead>
														<tr>
															<th>Nombre del Proceso</th>
															<th>Tipo</th>
															<th>Criterios</th>
															<th>Unidad Responsable</th>
															<th>Persona Responsable</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
														{this.state.procesos.map((p, i)=>(
															<tr key={i}>
																<td>{p.proceso}</td>
																<td>{p.tipo}</td>
																<td></td>
																<td>{p.unidad_resp}</td>
																<td>{p.persona_resp}</td>
																<td>
																	<button type="button" className="btn btn-danger btn-xs" name="Eliminar"
																		onClick={(e)=>this.eliminaProceso(p.id)}>
																		<i className="glyphicon glyphicon-remove-circle action-btn"></i>
																	</button>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</fieldset>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>




								
		)
	}
}

export default Matriz;