import React, {Component} from 'react';
import Swal from 'sweetalert2';
import Title from '../../general/title';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MultiSelect from "@khanacademy/react-multi-select";
import BtnsForm from '../../general/btnsForm';
import AccionModal from './accion_modal';

const $ = require('jquery');

const messages = {
  	searchPlaceholder: 'Buscar...',
  	noItemsMessage: 'Seleccione uno o mas elementos',
  	noneSelectedMessage: 'Nunguno Seleccionado',
  	selectedMessage: 'Seleccionado',
  	selectAllMessage: 'Seleccionar Todos',
  	clearAllMessage: 'Eliminar Todos',
};
var tipo = '';

class PTCI extends Component{
	constructor(props){
		super(props);

		this.selectEvaluacion = this.selectEvaluacion.bind(this);
		this.saving = this.saving.bind(this);
		this.canceling = this.canceling.bind(this);
		this.changeComponents = this.changeComponents.bind(this);
		this.openAccionModal = this.openAccionModal.bind(this);
		this.changeMejoras = this.changeMejoras.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.selectTab = this.selectTab.bind(this);

		this.state = {
			componentes: [],
			acreditaciones:[],
			acreditacion_selected:[],
			tabIndex: 0, 
			responsable:"",
			elemento:"",
			ptci_id:"",
		}
	}


	componentDidMount(){
		if(this.props.match.path.indexOf('institucional') !== -1){
			tipo = 'institucional';
		}else{
			tipo = 'especifico';
		}

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

		fetch(this.props.general.api+'element_component/ptci_institucional',{
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
						el.cumple 	 = "SI";
						el.evidencia = "";
						el.acredita  = [];
						el.accion 	 = "";
						el.f_inicio  = "";
						el.f_fin 	 = "";
						el.unidad 	 = "";
						el.persona 	 = "";
						el.medio 	 = "";
					});
				});

				this.setState({componentes:response.componente});

				setTimeout(()=>{
					this.getPtci();
				}, 500);
			}
		});

		

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

	getPtci(){
		var user = JSON.parse(sessionStorage.getItem('user'));

		fetch(this.props.general.api+'ptci/'+user.id+'/'+tipo,{
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
						ptci_id: response.id
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
			ptci:{
				responsable:this.state.responsable,
				elementos:[],
				tipo:tipo
			}
		};

		var error_accion = '';
		if(componente.elemento !== undefined){
			
			componente.elemento.map((ele)=>{
				var item = {
					id_element_comp:ele.id,
					cumple:ele.cumple,
					nombre_doc:ele.evidencia,
					acredita:ele.acredita,
					accion_mejora:ele.accion,
					fecha_inicio:ele.f_inicio,
					fecha_fin:ele.f_fin,
					unidad_responsable:ele.unidad,
					responsable:ele.persona,
					medio_verifica:ele.medio
				}

				if(ele.id_ptci_element !== undefined){
					item.id = ele.id_ptci_element;
				}

				if(ele.accion === "" || ele.f_ini === "" || ele.f_fin === ""){
					error_accion = 'Debe agregar una acción o mejora presionando el boton acción';
				}

				obj.ptci.elementos.push(item);
			});

			if(this.state.ptci_id !== ""){
				obj.ptci_id = this.state.ptci_id;
			}
		}
		
		if(error_accion === ''){
			if(this.props.general.isValidForm()){
				
				this.props.general.waiting.handleShow('Guardando...');
				fetch(this.props.general.api+'ptci',{
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
						this.setState({ptci_id: response.ptci_id});

						setTimeout(()=>{
							this.getPtci();
						}, 500);
					}
				});
			}else{
				Swal.fire('Error', 'Campos Incompletos', 'error');
			}	
		}else{
			this.props.general.isValidForm();
			Swal.fire('Error', error_accion, 'error');
		}	
	}

	canceling(e){
		e.preventDefault();

		this.props.history.push('/');
	}

	changeComponents(e, comp, ele, campo){
		var components = this.state.componentes;
		
		var valor = e.target !== undefined ? e.target.value : e;
		
		components.map((c, i)=>{
			if(comp === i){
				c.elemento.map((e, j)=>{
					if(ele === j){
						e[campo] = valor;
					}
				})
			}
		})
		
		this.setState({componentes:components});
	}

	openAccionModal(e, comp, ele){
		e.preventDefault();
		this.accion_modal.handleShow(comp, ele);

	}

	changeMejoras(comp, ele, campo, e){
		this.changeComponents(e, comp, ele, campo);
	}

	selectTab(e, i){
		this.setState({elemento:i});

		//verifica si ya se guaradon registros
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
									<div className="col-xs-12 col-sm-6">	
										<span>Responsable</span>
										<input name="responsable" id="responsable" value={this.state.responsable}
											onChange={this.handleChange} className="form-control" required />
									</div>
								</div>
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
										    					<th>Cumple</th>
										    					<th>Nombre Evidencia Documento</th>
										    					<th style={{width:'15%'}}>Acreditación</th>
										    					<th>Acción de Mejora</th>
										    					<th>Unidad Responsable</th>
										    					<th>Responsable de Implementación</th>
										    					<th>Medio de Verificación</th>
										    				</tr>
										    			</thead>
										    			
										    				{c.elemento.map((e, j)=>(
										    					<tbody key={j}>
										    					<tr>
										    						<td colSpan="7">{e.nombre}</td>
										    					</tr>
										    					<tr >										    						
										    						<td>
										    							<select value={e.cumple} id={'cumple_'+i+'_'+j} className="form-control" required
										    								onChange={(e)=>this.changeComponents(e, i, j, 'cumple')}>
										    								<option value="SI">SI</option>
										    								<option value="NO">No</option>
										    							</select>
										    						</td>
										    						<td>
										    							<textarea value={e.evidencia} id={'evidencia_'+i+'_'+j} style={{resize:'none'}} className="form-control" required
										    								onChange={(e)=>this.changeComponents(e, i, j, 'evidencia')}>
										    							</textarea>
										    						</td>
										    						<td>
										    							<MultiSelect
																	      	options={this.state.acreditaciones}
																	      	selected={e.acredita}
																	      	onSelectedChanged={(e, acreditacion_selected) => this.selectEvaluacion(e, i, j, 'acredita', acreditacion_selected, )}
																	      	required
																	      	messages={messages}
																	    />
										    						</td>
										    						<td>
										    							<button type="button" className="btn btn-info" 
										    								onClick={(e)=>this.openAccionModal(e, i, j)}>
										    								Acción
										    							</button>
										    						</td>
										    						<td>
										    							<input className="form-control" value={e.unidad} id={'unidad_'+i+'_'+j} required
										    								onChange={(e)=>this.changeComponents(e, i, j, 'unidad')} />
										    						</td>
										    						<td>
										    							<input className="form-control" value={e.persona} required id={'persona_'+i+'_'+j}
										    								onChange={(e)=>this.changeComponents(e, i, j, 'persona')} />
										    						</td>
										    						<td>
										    							<textarea style={{resize:'none'}} className="form-control" value={e.medio} required
										    								id={'medio_'+i+'_'+j} onChange={(e)=>this.changeComponents(e, i, j, 'medio')}></textarea>
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

				<AccionModal {...this.props} onRef={ref => this.accion_modal = ref} 
					change={this.changeMejoras} components={this.state.componentes} />

			</div>

		)
	}
}

export default PTCI;