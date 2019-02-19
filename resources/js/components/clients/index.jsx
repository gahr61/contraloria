import React, {Component} from 'react';
import Table from '../general/table_list';


class Clients extends Component{
	constructor(props){
		super(props);

		this.state = {
			columns:[{title:'prueba'}],
			list:[{name:'prueba 1'}],
		}
	}

	render(){
		return (
			<div className="col-xs-12 form-group container-fluid">
				<div className="card">
					<div className="card-header">
						Clientes
					</div>
					<div className="card-body">
						{/*Componente botones nuevo
							params 
								action=new, edit, delete
								props*/}
						<Table
							columns={this.state.columns}
							list={this.state.list}
							{...this.props}
						/>

						{/*Componente tabla
							params
								list:[]
								*/}
				  	</div>
				</div>
			</div>
		)
	}
			
}

export default Clients