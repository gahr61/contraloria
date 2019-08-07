import React, {Component} from 'react';

class ModalPermissions extends Component{
	constructor(props){
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.assign_design = this.assign_design.bind(this);

		this.state = {
			options:[],
			role_id:'',
			opt_selected:[],
		}
	}

	componentDidMount() {
		this.props.onRef(this);		
	}

	componentWillUnmount() {
		this.props.onRef(null)
	}

	handleChange(value){
		this.setState({value});
	}

	handleClose() {
		$('#modal_reset').modal('hide');
		$('#modal_reset').removeClass('in');
		$('.modal-backdrop').remove();
		$('#modal_reset').css('display', 'none');
	}

	handleShow(id) {
		$('#permissions').multiSelect('destroy');

		this.props.general.waiting.handleShow('Cargando...');
		fetch(this.props.general.api+'assignedPermissions/'+id,{
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
				var opt = [];
				response.map((res)=>{
					if(res.assigned){
						opt.push(res.id.toString());
					}
				});

				this.setState({role_id:id, options:response, opt_selected:opt});

				$('#modal_reset').addClass('in');
				$('#modal_reset').css('display', 'block');

				$('#permissions').multiSelect({
			        selectableHeader: "<div class='custom-header'>Permisos no asignados</div>",
			        selectionHeader: "<div class='custom-header'>Permisos asignados</div>",
			        afterSelect:(value)=>{//enviamos al servidor el id del permiso seleccionado
			        	this.assign_design('toAssign', value[0]);
			        },
			        afterDeselect:(value)=>{//enviamos al servidor el id del permiso seleccionado
			           this.assign_design('design', value[0]);
			        }
			    });

				
			}
		})
	}

	assign_design(url, id){
		var obj = {
			role_id: this.state.role_id,
			permission_id: id
		};

		fetch(this.props.general.api+url,{
			method:'post',
			body:JSON.stringify(obj),
			headers: new Headers({
				//'Autorization'	: 'Bearer '+sessionStorage.getItem('toke'),
				'Accept'		: 'application/json',
				'Content-Type'	: 'application/json'
			})
		}).then(res => {
			if(res.ok){
				return res.json();
			}else{
				console.log(res.text());
			}
		}).then(response => {});
	}

	render(){		
		return (
			<div className="modal fade" id="modal_reset" ref={el => this.el = el}>
				<div className="modal-dialog">
					<div className="modal-content">
          				<div className="modal-header">
            				<button type="button" className="close" data-dismiss="modal" aria-label="Close"
            					onClick={this.handleClose}>
              					<span aria-hidden="true">&times;</span>
              				</button>
            				<h4 className="modal-title">
            					Asignar Permisos
            				</h4>
          				</div>
          				<div className="modal-body">
          					<select multiple="multiple" ref={el => this.el = el} id="permissions" name="permissions" value={this.state.opt_selected}
          						onChange={(e)=>e.preventDefault}>
								{this.state.options.map((opt, i)=>(
									<option key={i} text={opt.id} value={opt.id} >
										{opt.name}
									</option>
								))}
						    </select>
          				</div>
        			</div>
				</div>
			</div>
							
		)
	}
}

export default ModalPermissions;