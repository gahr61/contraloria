import 'datatables.net-dt/css/jquery.dataTables.css';
import React, {Component} from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net-dt');

class Table extends Component{
	constructor(props){
		super(props);

		
		this.setTable 	= this.setTable.bind(this);
		this.resetTable = this.resetTable.bind(this);

		this.edit 	= this.edit.bind(this);
		this.delete = this.delete.bind(this);
		this.reset 	= this.reset.bind(this);
	}

	componentDidMount(){
		this.props.onRef(this);
	}

	resetTable(){
		this.$el = $(this.el);
		this.$el.DataTable().destroy();
		this.$el.empty();
		//this.setTable();
	}

	setTable(){
		this.$el = $(this.el);

		var table = this.$el.DataTable({
			data: this.props.data,
			columns:this.props.columns,
			paging:false,
			responsive:true,
			searching: this.props.filter,
			scrollY:"32em",
			scrollX: true,
			autoWidth: false,
			info:false,
			ordering:true,
			createdRow: (row, data, dataIndex)=>{
                var i = data.length - 1;
                $('td:eq('+i+')', row).html('');
                this.props.buttons.map((b)=>{
                	var icon = b.icon !== null ? '<i class="'+b.icon+'"></i>' : b.name;
                    if(b.btn){
                        $('td:eq('+i+')', row).append(
                            '<button class="'+b.class+'" name="'+b.clickFn+'"'+
                            	'value='+data[i]+
                            	' title="'+b.name+'" style="margin-right:5px;">'+
                                icon+
                            '</button>' 
                        );
                    }
                })

          	}
		});

		$(document).off('click').on('click', '.action-btn', (e)=>{
			e.preventDefault();
			var clickFn = e.target.name !== undefined ? e.target.name : e.target.parentNode.name;
			var id = e.target.value !== undefined ? e.target.value :e.target.parentNode.value;
	
			if(clickFn === 'reset'){
				this.props[clickFn](e, id);
			}else{
				this.props[clickFn](id);
			}
			

		})
	}

	edit(id){
		this.props.edit(id);
	}

	delete(id){
		this.props.delete(id);
	}

	reset(id){
		this.props.reset(id);
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