import React, {Component} from 'react';
import $ from 'jquery';

class TableList extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.columns.map((c)=>(
			$('.table thead tr').append(
				'<th>'+
					c.title+
				'</th>'
			)
		));

		this.props.list.map((l)=>(
			$('.table tbody').append(
				'<tr>'+
					'<td>'+
						l.name+
					'</td>'+
				'</tr>'
			)
		));
		
	}

	render(){
		return(
			<div className="col-xs-12">
				<table className="table">
					<thead><tr></tr></thead>
					<tbody></tbody>
				</table>
			</div>
		)
	}
} 

export default TableList;