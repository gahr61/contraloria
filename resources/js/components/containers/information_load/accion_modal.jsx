import React, {Component} from 'react';
import * as $ from 'jquery';

import modal from 'bootstrap/js/dist/modal';

class AccionModal extends Component{
	constructor(props) {
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
		    comp:"",
		    ele:"",
		};
	}

	componentDidMount() {
		this.props.onRef(this);
	}

	componentWillUnmount() {
		this.props.onRef(null)
	}

	handleClose() {
		$('#modal_accion').modal('hide');
		$('#modal_accion').removeClass('in');
		$('.modal-backdrop').remove();
		$('#modal_accion').css('display', 'none');

		this.setState({comp:"", ele:""});
	}

	handleShow(comp, ele, campo) {
		this.setState({
			comp:comp,
			ele:ele
		});
		$('#modal_accion').addClass('in');
		$('#modal_accion').css('display', 'block');
	}

	render(){
		var comp = this.state.comp;
		var ele = this.state.ele;
		var element = "";

		if(comp !== "" && ele !== ""){
			element = this.props.components[comp].elemento[ele];
		}else{
			element = "";
		}

		return(
			<div className="modal fade" id="modal_accion" ref={el => this.el = el}>
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
          				<div className="modal-header">
            				<button type="button" className="close" data-dismiss="modal" aria-label="Close"
            					onClick={this.handleClose}>
              					<span aria-hidden="true">&times;</span>
              				</button>
            				<h4 className="modal-title">
            					Acción
            				</h4>
          				</div>
          				<div className="modal-body">
            				<div className="row ">
            					<div className="col-xs-12 col-sm-6 form-group">
            						<span>Fecha Inicio</span>
            						<input type="date" className="form-control input-sm" 
            							value={element.f_inicio} required id={'f_inicio' }
            							onChange={(e)=>this.props.change(comp, ele, 'f_inicio', e)} />
            					</div>            					

            					<div className="col-xs-12 col-sm-6 form-group">
            						<span>Fecha Terminado</span>
            						<input type="date" className="form-control input-sm" 
            							value={element.f_fin} required id={'f_fin'}
            							min={element.f_inicio}
            							onChange={(e)=>this.props.change(comp, ele, 'f_fin', e)} />
            					</div>

            					<div className="col-xs-12 form-group">
            						<span>Mejora</span>
            						<textarea className="form-control" 
            							value={element.accion} required id={'accion'}
            							onChange={(e)=>this.props.change(comp, ele, 'accion', e)}>
            						</textarea>
            					</div>
            					<div className="col-xs-12" style={{textAlign:'center'}}>
               						<button className="btn btn-info" style={{marginLeft:'5px'}} onClick={this.handleClose}>Cerrar</button>
            					</div>
            				</div>
          				</div>
        			</div>
				</div>
			</div>
		)
	}
}

export default AccionModal;