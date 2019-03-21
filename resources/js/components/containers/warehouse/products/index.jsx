import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../../../general/title';
import Table from '../../../general/table';



class Products extends Component{
	constructor(props){
		super(props);

		this.getProducts 	= this.getProducts.bind(this);
		this.editProduct 	= this.editProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this)

		this.state = {
			columns: [
				{title:'Codigo'},
				{title:'Producto'},
				{title:'Marca'},
				{title:'Presentación'},
				{title:'Unidad/Medida'},
				{title:'Aviso'},
				{title:'Accion'},
			],
			data: [[
				1,
				'Agua',
				'Lorman',
				'Botella',
				'botella',
				2,
				1
			],[
				1,
				'Agua',
				'Oxxo',
				'Botella',
				'botella',
				2,
				2
			]],
			actionButton: [
				{	btn: true, 
					name:'Editar', 
					class:'btn btn-warning btn-xs action-btn', 
					icon:'fa fa-pencil',
					clickFn:'edit'
				},
				{	btn: true, 
					name:'Eliminar', 
					class:'btn btn-danger btn-xs', 
					icon:'glyphicon glyphicon-remove-circle action-btn',
					clickFn:'delete'
				},
			]
		}
	}

	componentDidMount(){
		this.getProducts();

		setTimeout(()=>{
			this.table.setTable();
		}, 500);
	}

	getProducts(){

		
	}

	editProduct(id){
		console.log(id);
	}

	deleteProduct(id){
		console.log(id);
		this.state.data.map((d, i)=>{
			d.map((v)=>{
				if(v === id){
					this.state.data.splice(i, 1);
				}
			})
		})

		this.forceUpdate();

		setTimeout(()=>{
			if(this.state.data.length === 0){
				this.table.resetTable()
			}
		}, 100);			
	}


	render(){
		return (
			<div>
				<Title {...this.props} />
				<div className="box box-default">
					<div className="box-body">
						<div className="row">
							<div className="col-xs-12 col-sm-1 form-group">

								<Link to={`${this.props.match.url}/new`} className="btn btn-block btn-primary btn-sm">
									Nuevo
								</Link>
							</div>

							<Table {...this.props} 
								columns	= {this.state.columns} 
								data	= {this.state.data} 
								buttons	= {this.state.actionButton}
								edit 	= {this.editProduct}
								delete 	= {this.deleteProduct}
								getList = {this.getProducts}
								onRef 	= {ref => (this.table = ref)}/>
						</div>
					</div>
				</div>

			</div>
		)
	}
} 

export default Products;