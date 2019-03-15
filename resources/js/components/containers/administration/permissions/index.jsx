import React, {Component} from 'react';
import Title from '../../../general/title';
import Table from '../../../general/table';

class Permissions extends Component{
	constructor(props){
		super(props);

		this.getPermissions 	= this.getPermissions.bind(this);
		
		this.state = {
			columns: [
				{title:'Nombre'},
				{title:'Nombre mostrado'},
				{title:'Descripción'},
			],
			data: [[
				'admin_menu',
				'Menu Administración',
				'Permite ver menu administracion',
				1
			],[
				'admin_user_view',
				'Ver usuarios',
				'Permite ver listado de usuarios',
				2
			]],
			actionButton: []
		}
	}

	UNSAFE_componentWillMount(){
		//this.table.setTable();
		this.getPermissions();
		//this.table.resetTable();
		setTimeout(()=>{
			this.table.setTable();
		}, 100);		
	}

	getPermissions(){

		
	}


	render(){
		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<Table {...this.props} 
								columns	= {this.state.columns} 
								data	= {this.state.data} 
								buttons	= {this.state.actionButton}
								onRef 	= {ref => (this.table = ref)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
} 

export default Permissions;