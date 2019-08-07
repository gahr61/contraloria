import React from 'react';
import {Link} from 'react-router-dom';

const LeftPanel = (props)=>(

	<aside className="main-sidebar">
    	<section className="sidebar">
	      	<div className="user-panel">
	        	<div className="pull-left image">
	          		<img src="plugins/AdminLTE/img/no-photo.png" className="img-circle" alt="User Image" />
	        	</div>
	        	<div className="pull-left info">
	          		<p>{props.user.name}</p>
	          		<Link to="#" onClick={props.logout()}><i className="fa fa-circle text-success"></i> Online</Link>
	        	</div>
	      	</div>
	      	<ul className="sidebar-menu" data-widget="tree">
	        	<li><Link to="/"><i className="fa fa-book"></i> <span>Dashboard</span></Link></li>
	        	
	        	<li className="treeview">
		          	<a href="#">
			            <i className="fa fa-group if("></i> <span>Administración</span>
			            <span className="pull-right-container">
			              	<i className="fa fa-angle-left pull-right"></i>
			            </span>
		          	</a>
		          	<ul className="treeview-menu">
			            <li><Link to="/permissions"><i className="fa fa-circle-o"></i>Permisos</Link></li>
			            <li><Link to="/roles"><i className="fa fa-circle-o"></i>Roles</Link></li>
			            <li><Link to="/users"><i className="fa fa-circle-o"></i>Usuarios</Link></li>
		          	</ul>
		        </li>
		        <li className="treeview">
		          	<a href="#">
			            <i className="fa fa-archive"></i> <span>Almacen</span>
			            <span className="pull-right-container">
			              	<i className="fa fa-angle-left pull-right"></i>
			            </span>
		          	</a>
		          	<ul className="treeview-menu">
			            <li><Link to="/articles"><i className="fa fa-circle-o"></i>Articulos</Link></li>
			            <li><Link to="/inventory"><i className="fa fa-circle-o"></i>Inventario</Link></li>
			            <li><Link to="/notes"><i className="fa fa-circle-o"></i>Notas</Link></li>
		          	</ul>
		        </li>
	        </ul>
      	</section>
	</aside>
)
	
export default LeftPanel;