import React from 'react';
import {Link} from 'react-router-dom';

const Title = (props)=>(
	<section className="content-header">
		<h1>
        	{props.title}
      	</h1>
      	<ol className="breadcrumb">
      		<li><Link to="/"><i className="fa fa-dashboard"></i>Inicio</Link></li>
       		<li className="active">{props.title}</li>
      	</ol>
    </section>
)

export default Title;