import 'datatables.net-dt/css/jquery.dataTables.css';
import React, {Component} from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net-dt');

class Table extends Component{
	constructor(props){
		super(props);

		this.setTable 	= this.setTable.bind(this);
		this.resetTable = this.resetTable.bind(this);
	}
	componentDidMount(){
		this.setTable();
		//this.resetTable();
		
	}

	resetTable(){
		this.$el = $(this.el);
		this.$el.DataTable().destroy();
		this.$el.empty();
		setTimeout(()=>{
			this.setTable();
		}, 500);
	}

	setTable(){
		this.$el = $(this.el);
		var table = this.$el.DataTable({
			data: this.props.data,
			columns:this.props.columns,
			paging:false,
			responsive:true,
			searching: false,
			scrollY:"32em",
			scrollX: true,
			autoWidth: false,
			info:false,
			ordering:true,
			createdRow: (row, data, dataIndex)=>{
				console.log(data, this.props)
				var i = data.length - 1;
				$('td:eq('+i+')', row).html('');
				this.props.buttons.map((b)=>{
					if(b.btn){
						$('td:eq('+i+')', row).append(
							'<button class="'+b.class+'" title="'+b.name+'" style="margin-right:5px;">'+
								'<i class="'+b.icon+'"></i>'+
							'</button>' 
						);
					}
				})

            }
		});
	}

	render(){
		return (
			<div className="col-xs-12 from-group">
				<div className="table-resposive">
					<table className="table" id="table" ref={el => this.el = el}>

					</table>
				</div>
			</div>
		)
	}
}

export default Table;