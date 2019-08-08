import React, {Component} from 'react';
import Title from '../../general/title';

class Orders extends Component{
	constructor(props){
		super(props);

		this.getOrder = this.getOrder.bind(this);

		this.state = {
			columns: [
				{title:'id'},
				{title:'Cliente'},
				{title:'Dirección de entrega'},
				{title:'Numero de contacto'}
			],
			data: [],
			actionButton: [],
			company:'all',
		}
	}

	render(){
		return(
			<div>
				<Title {...this.props} />

				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<div className="col-xs-12 form-group">
								<div className="col-xs-12 col-sm-2">
									<span>Empresa</span>
									<select className="form-control">
										<option value="all">TODOS</option>
									</select>
								</div>
								<div className="col-xs-12 col-sm-2">
									<Link to={`${this.props.match.url}/new`} className="btn btn-block btn-primary btn-sm">
										Nuevo
									</Link>
								</div>
							</div>

							<Table {...this.props} 
								columns	= {this.state.columns} 
								data	= {this.state.data} 
								buttons	= {this.state.actionButton}
								getList = {this.getRole}
								onRef 	= {ref => (this.table = ref)}
								filter  = {true}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Orders;