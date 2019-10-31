import React, {Component} from 'react';
import Swal from 'sweetalert2';
import Title from '../../general/title';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MultiSelect from "@khanacademy/react-multi-select";
import BtnsForm from '../../general/btnsForm';

const $ = require('jquery');

var tipo = '';

class Report extends Component{
	constructor(props){
		super(props);

		this.selectEvaluacion = this.selectEvaluacion.bind(this);
		this.saving = this.saving.bind(this);
		this.canceling = this.canceling.bind(this);
		this.changeComponents = this.changeComponents.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.selectTab = this.selectTab.bind(this);
		this.getElements = this.getElements.bind(this);
		//this.getProcesos = this.getProcesos.bind(this);

		this.setPorcentajes = this.setPorcentajes.bind(this);
		this.addMedio = this.addMedio.bind(this);
		this.removeMedio = this.removeMedio.bind(this);

		this.state = {
			ejercicio:"",
			ejercicios:[],
			componentes: [],
			acreditaciones:[],
			acreditacion_selected:[],
			tabIndex: 0, 
			responsable:"",
			elemento:"",
			reporte_id:"",
			tipo:"",
			procesos:[],
			proceso_id:"",
			trimestre:"",
			trimestre_id:"",
		}
	}


	componentDidMount(){
		if(this.props.match.path.indexOf('institucional') !== -1){
			tipo = 'institucional';
		}else{
			tipo = 'especifico';

			this.getProcesos();
		}

		this.setState({tipo:tipo});

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

		fetch(this.props.general.api+'trimestre',{
			method:'get',
			headers: new Headers({
				'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res =>{
			if(res.ok){
				return res.json();
			}else{
				res.text().then((msg)=>{
					console.log(msg);
				});
			}
		}).then(response => {
			if(response !== undefined){
				var t = this.props.general.getTrimestre();
				var index = response.findIndex(obj =>
					obj.nombre.indexOf(t) !== -1
				);

				if(index !== -1){
					this.setState({
						trimestre: response[index].nombre,
						trimestre_id: response[index].id
					});
				}

			}
		})

		fetch(this.props.general.api+'acreditacion',{
			method:'get',
			headers: new Headers({
				'Authorization'	: 'Bearer '+sessionStorage.getItem('token'),
				'Accept'		: 'application/json',
				'Content-Type' 	: 'application/json'
			})
		}).then(res => {
			if(res.ok){
				return res.json();
			}else{
				res.text().then((msg)=>{
					Swal.fire('Error', msg, 'error');
				});
			}
		}).then(response => {
			if(response !== undefined){
				var acreditaciones = [];
				response.map((c)=>{
					acreditaciones.push({label:c.nombre, value:c.id});
				})

				this.setState({acreditaciones:acreditaciones});
			}
		});	

		this.getElements();

		setTimeout(()=>{
			$('.react-tabs__tab-list > li').each(function(i){
				if(i === 0){
					$(this).addClass('react-tabs__tab--selected');
					$(this).attr('aria-selected', 'true');	
				}
			});

			$('.react-tabs__tab-panel').each(function(i){
				if(i === 0){
					$(this).addClass('react-tabs__tab-panel--selected');	
				}
			});

			
		}, 500);
	}

	componentDidUpdate(){
		if(this.props.match.path.indexOf('institucional') !== -1){
			tipo = 'institucional';
		}else{
			tipo = 'especifico';
		}

		if(tipo !== this.state.tipo){
			this.setState({
				tipo:tipo, 
				responsable:"",
				ptci_id:"",
				procesos:[],
				proceso_id:""
			});
			this.getElements();	

			if(tipo === 'especifico'){
				this.getProcesos();
			}
		}	
	}

	getProcesos(){
		var user = JSON.parse(sessionStorage.getItem('user'));

		fetch(this.props.general.api+'proceso_prior/'+user.id,{
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
					console.log(msg);
				});
			}
		}).then(response => {
			if(response !== undefined){
				this.setState({procesos:response.procesos});
			}
		});
	}

	getElements(){
		fetch(this.props.general.api+'element_component/reporte_'+tipo,{
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
					Swal.fire('Error', msg, 'error');
				});
			}
		}).then(response => {
			if(response !== undefined){
				response.componente.map((comp)=>{
					comp.elemento.map((el)=>{
						el.accion 	 = "";
						el.f_inicio  = "";
						el.f_fin 	 = "";
						el.medio 	 = [];
						el.archivo   = "";
						el.obstaculo = "";
						el.propuesta = "";
						el.porcentaje_cumple = 0;
						el.id_element_comp = el.id;
					});
				});

				this.setState({componentes:response.componente});

				setTimeout(()=>{
					//this.getReport();
				}, 500);
			}
		});
	}

	getReport(){
		var user = JSON.parse(sessionStorage.getItem('user'));

		fetch(this.props.general.api+'reporte/'+user.id+'/'+tipo,{
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
					console.log(msg);
				});
			}
		}).then(response => {
			if(response !== undefined){
				if(response.elemento !== undefined){
					var components = this.state.componentes;

					response.elemento.map((ele)=>{
						var i_comp = components.findIndex(obj => 
							obj.id === ele.componente.id
						);

						var i_ele =  components[i_comp].elemento.findIndex(obj =>
							obj.id === ele.id_element_comp
						)

						components[i_comp].elemento[i_ele].id_ptci_element = ele.id;
						components[i_comp].elemento[i_ele].cumple 	  = ele.cumple.toUpperCase();
						components[i_comp].elemento[i_ele].evidencia = ele.nombre_doc;
						components[i_comp].elemento[i_ele].acredita  = ele.acredita;
						components[i_comp].elemento[i_ele].f_inicio  = ele.fecha_inicio;
						components[i_comp].elemento[i_ele].f_fin 	  = ele.fecha_fin;
						components[i_comp].elemento[i_ele].accion 	  = ele.accion_mejora;
						components[i_comp].elemento[i_ele].unidad 	  = ele.unidad_responsable;
						components[i_comp].elemento[i_ele].persona   = ele.responsable;
						components[i_comp].elemento[i_ele].medio 	  = ele.medio_verifica;

						this.accion_modal.handleShow(i_comp, i_ele);
						this.accion_modal.handleClose();
					});

					this.setState({
						responsable: response.responsable,
						componentes: components, 
						ptci_id: response.id,
						proceso_id: response.proceso
					});

				}
					
			}
		});
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	selectEvaluacion(e, comp, ele, campo){
		this.changeComponents(e, comp, ele, campo);
	}

	saving(e){
		e.preventDefault();

		var user = JSON.parse(sessionStorage.getItem('user'));
		var componente = this.state.componentes[this.state.elemento];

		var obj = {
			user_id: user.id,
			reporte:{
				responsable:this.state.responsable,
				ejercicio:this.state.ejercicio,
				trimestre:this.state.trimestre_id,
				elementos:[],
				tipo:tipo
			}
		};

		/*if(tipo === 'especifico'){
			obj.ptci.proceso = this.state.proceso_id;
		}*/

		
		if(componente.elemento !== undefined){
			componente.elemento.map((ele)=>{
				var item = {
					accion:ele.accion,
					fecha_inicio:ele.fecha_inicio,
					fecha_fin:ele.fecha_fin,
					total:ele.porcentaje_cumple,
					medio:ele.medio,
					obstaculo:ele.obstaculo,
					propuesta:ele.propuesta,
					//id_reporte se guarda hasta que se haya guardado por primera vez
					id_element_comp:ele.id,
				}

				/*if(ele.id_ptci_element !== undefined){
					item.id = ele.id_ptci_element;
				}

				if(ele.accion === "" || ele.f_ini === "" || ele.f_fin === ""){
					error_accion = 'Debe agregar una acción o mejora presionando el boton acción';
				}*/

				obj.reporte.elementos.push(item);
			});

			/*if(this.state.ptci_id !== ""){
				obj.ptci_id = this.state.ptci_id;
			}*/
		}
		
		console.log(obj)
		if(this.props.general.isValidForm()){
			
			this.props.general.waiting.handleShow('Guardando...');
			fetch(this.props.general.api+'reporte',{
				method:'post',
				body:JSON.stringify(obj),
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
						console.log(msg);
					});
				}
			}).then(response => {
				if(response !== undefined){
					this.setState({reporte_id: response.reporte_id});

					setTimeout(()=>{
						//this.getReport();
					}, 500);
				}
			});
		}else{
			Swal.fire('Error', 'Campos Incompletos', 'error');
		}
			
	}

	canceling(e){
		e.preventDefault();

		this.props.history.push('/');
	}

	changeComponents(e, comp, ele, campo){
		var components = this.state.componentes;
		
		var valor = e.target !== undefined ? e.target.value : e;
		
		console.log(valor)
		if(campo === 'porcentaje_cumple'){
			valor =  parseInt(valor) < 0 ? 0 : parseInt(valor) > 100 ? 100 : valor;
		}

		components.map((c, i)=>{
			if(comp === i){
				c.elemento.map((e, j)=>{
					if(ele === j){
						e[campo] = valor;

						if(campo === 'porcentaje_cumple'){
							this.setPorcentajes();
						}
					}
				})
			}
		})
		
		this.setState({componentes:components});
	}


	selectTab(e, i){
		this.setState({elemento:i});
	}

	setPorcentajes(){
		var sum = 0;
		var cont = 0;
		var prom = 0;
		
		//porcentaje trimestre
		var componentes = this.state.componentes;
		componentes.map((comp)=>{
			comp.elemento.map((el)=>{
				cont++;
				sum += el.porcentaje_cumple.length > 0 ? parseInt(el.porcentaje_cumple) : 0;
			})				
		});

		prom = sum / cont;
		$('#progresoTrimestre').removeClass()
				.addClass('progress-bar progress-bar-success')
				.css('width', prom+'%')
				.attr('aria-valuenow', prom);
		$('#tagT').html(prom+'$ Completado');

		sum = 0;
		cont = 0;
		prom = 0;
		//porcentaje ejercicio
		var componente = this.state.componentes[this.state.elemento];
		componente.elemento.map((el)=>{
			cont++;
			sum += el.porcentaje_cumple.length > 0 ? parseInt(el.porcentaje_cumple) : 0;
		})

		prom = sum / cont;
		$('#progresoEjercicio').removeClass()
				.addClass('progress-bar progress-bar-success')
				.css('width', prom+'%')
				.attr('aria-valuenow', prom);
		$('#tag').html(prom+'$ Completado');
	}

	addMedio(e, comp, ele, archivo, medio, valor){
		e.preventDefault();
		var componentes = this.state.componentes;
		var archivo = componentes[comp].elemento[ele].archivo;
		if(archivo === ""){
			Swal.fire('Error', 'Debe seleccionar un archivo', 'error');
		}else{
			var medio = componentes[comp].elemento[ele].medio;
			medio.push(archivo);
			componentes[comp].elemento[ele].archivo = "";
			this.setState({componentes:componentes});
		}
	}

	removeMedio(comp, ele, medio){
		var componentes = this.state.componentes;
		componentes[comp].elemento[ele].medio.splice(medio, 1);
		this.setState({componentes:componentes});
	}

	render(){
		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<form>
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
										<span style={{display:'block'}}>Trimestre</span>
										<span style={{position:'relative', top:'1px', fontSize:'20px'}}>{this.state.trimestre}</span>
									</div>
									<div className="col-xs-12 col-sm-2">
										<span style={{display:'block'}}>Acumulado Ejercicio</span>
										<div className="progress" style={{position:'relative', top:'3px'}}>
											<div id="progresoEjercicio" className="progress-bar progress-bar-success" 
												role="progressbar" aria-valuenow="0" aria-valuemin="0" 
												aria-valuemax="100" style={{width:"0%"}}>
										  		<strong id="tag">0% Completado</strong> 
											</div>
									  	</div>

									</div>
									<div className="col-xs-12 col-sm-2">
										<span style={{display:'block'}}>Acumulado Trimestre Actual</span>
										<div className="progress"  style={{position:'relative', top:'3px'}}>
											<div id="progresoTrimestre" className="progress-bar progress-bar-success" 
												role="progressbar" aria-valuenow="40" aria-valuemin="0" 
												aria-valuemax="100" style={{width:"0%"}}>
										  		<strong id="tagT">0% Completado</strong> 
											</div>
									  	</div>
									</div>
								</div>
								<div className="col-xs-12">
									<div className="col-xs-12 col-sm-6">	
										<span>Responsable</span>
										<input name="responsable" id="responsable" value={this.state.responsable}
											onChange={this.handleChange} className="form-control" required />
									</div>
								</div>
								{tipo === 'especifico' ?
									<div className="col-xs-12">	
										<div className="col-xs-12 col-sm-6">	
											<span>Proceso Especifico</span>
											<select className="form-control" name="proceso_id" id="proceso_id" required
												value={this.state.proceso_id} onChange={this.handleChange}>
												<option value="">Seleccione...</option>
												{this.state.procesos.map((p, i)=>(
													<option key={i} value={p.id} responsable={p.persona_resp}>
														{p.proceso}
													</option>

												))}
											</select>
										</div>
									</div>
								:null}
								<div className="col-xs-12 form-group">
									<fieldset>
										<legend>Componentes de Control</legend>
										<Tabs>
										    <TabList>
										    	{this.state.componentes.map((c, i)=>(
										    		<Tab key={i} onClick={(e)=>this.selectTab(e, i)}>{c.posicion+' '+c.componente}</Tab>
										    	))}
										    </TabList>

										    {this.state.componentes.map((c, i)=>(
										    	<TabPanel key={i}>
										    		<table className="table table-hover table-responsive">
										    			<thead>
										    				<tr>
										    					<th colSpan="7">Elemento</th>
										    				</tr>
										    				<tr>										    					
										    					<th>Acción de Mejora</th>
										    					<th>Fecha Inicio</th>
										    					<th>Fecha Término</th>
										    					<th>Medio de Verificación</th>
										    					<th></th>
										    					<th>Obstaculo para Cumplir la Acción</th>
										    					<th>Propuesta de Solución</th>
										    					<th>% Cumplimiento</th>
										    					<th>% Acumulado</th>
										    				</tr>
										    			</thead>
										    			
										    				{c.elemento.map((e, j)=>(
										    					<tbody key={j}>
										    					<tr>
										    						<td colSpan="9">{e.nombre}</td>
										    					</tr>
										    					<tr >										    						
										    						<td>
											    						<input className="form-control" value={e.accion} id={'accion_'+i+'_'+j} required
										    								onChange={(e)=>this.changeComponents(e, i, j, 'accion')} />
										    						</td>
										    						<td>
										    							<input type="date" className="form-control" value={e.fecha_inicio} id={'fecha_inicio_'+i+'_'+j} required
										    								onChange={(e)=>this.changeComponents(e, i, j, 'fecha_inicio')} />
										    						</td>
										    						<td>
										    							<input type="date" className="form-control" value={e.fecha_fin} id={'fecha_fin_'+i+'_'+j} required
										    								onChange={(e)=>this.changeComponents(e, i, j, 'fecha_fin')} />
										    						</td>
										    						<td>

										    							<input type="file" id={'archivo_'+i+'_'+j} data-validation="required extension" 
										    								data-validation-allowing="pdf, zip, doc, docx, xls, xlsx" value={e.archivo}
										    								className="" required onChange={(e)=>this.changeComponents(e, i, j, 'archivo')}/>
										    							<div style={{marginTop:'8px'}}>
										    							{e.medio.map((m, x)=>
										    								<div key={x}  style={{display:'block'}}>
										    									<span style={{marginRight:'8px'}}>{m.replace("C:\\fakepath\\", '')}</span>
										    									<i className="fa fa-close" style={{cursor:'pointer'}} 
										    										onClick={(e)=>this.removeMedio(i, j, x)}></i>
										    								</div>
										    							)}
										    							</div>
										    						</td>
										    						<td>
										    							<button type="button" name="Agregar" className="btn btn-info"
										    								onClick={(e)=>this.addMedio(e, i, j, 'archivo', 'medio', e.archivo)}>
										    								{' + '}
										    							</button>
										    						</td>
										    						<td>
										    							<input className="form-control" value={e.obstaculo} id={'obstaculo_'+i+'_'+j} required
										    								onChange={(e)=>this.changeComponents(e, i, j, 'obstaculo')} />
										    						</td>
										    						<td>
										    							<input className="form-control" value={e.propuesta} id={'propuesta_'+i+'_'+j} required
										    								onChange={(e)=>this.changeComponents(e, i, j, 'propuesta')} />
										    						</td>
										    						<td>
										    							<input type="number" min="0" max="100" className="form-control" value={e.porcentaje_cumple} required id={'porcentaje_cumple_'+i+'_'+j}
										    								onChange={(e)=>this.changeComponents(e, i, j, 'porcentaje_cumple')}  pattern="^[0-9]+" />
										    						</td>
										    						<td>
										    							<div className="progress">
											  								<div className={e.porcentaje_cumple <= 40 ?
											  										'progress-bar progress-bar-danger'
											  									: e.porcentaje_cumple > 40 && e.porcentaje_cumple < 80 ?
											  										'progress-bar progress-bar-warning'
											  									: "progress-bar progress-bar-success"
											  									} 
											  									id={"barra_"+i+'_'+j} 
											  									role="progressbar" 
											  									aria-valuenow={e.porcentaje_cumple <= 40 ?
											  											e.porcentaje_cumple
											  										: e.porcentaje_cumple > 40 && e.porcentaje_cumple < 80 ?
											  											e.porcentaje_cumple
											  										: e.porcentaje_cumple
											  									}
											  									aria-valuemin="0" aria-valuemax="100" 
											  									style={e.porcentaje_cumple <= 40 ?
											  											{width: e.porcentaje_cumple+"%"}
											  										: e.porcentaje_cumple > 40 && e.porcentaje_cumple < 80 ?
											  											{width: e.porcentaje_cumple+"%"}
											  										: {width: e.porcentaje_cumple+"%"}}
											  								>
											  									<strong>{e.porcentaje_cumple+'% Completado'}</strong>
											  								</div>
																		</div>
										    						</td>
										    					</tr>
										    					</tbody>
										    				))}
										    			
										    		</table>
										    	</TabPanel>
										    ))}
										</Tabs>
									</fieldset>


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

export default Report;