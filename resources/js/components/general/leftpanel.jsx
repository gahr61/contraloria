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
	          		<Link to="#"><i className="fa fa-circle text-success"></i> Online</Link>
	        	</div>
	      	</div>
	      	<ul className="sidebar-menu" data-widget="tree">
	        	<li><Link to="/"><i className="fa fa-book"></i> <span>Dashboard</span></Link></li>
	        	{props.permissions.admin_menu ?
	        		<li className="treeview">
			          	<a href="#">
				            <i className="fa fa-group if("></i> <span>Administración</span>
				            <span className="pull-right-container">
				              	<i className="fa fa-angle-left pull-right"></i>
				            </span>
			          	</a>
			          	<ul className="treeview-menu">
				            {props.permissions.admin_permissions_view ? 
				            	<li>
					            	<Link to="/permissions">
					            		<i className="fa fa-circle-o"></i>Permisos
					            	</Link>
				            	</li>
				            :null}
				            {props.permissions.admin_roles_view ?
				            	<li><Link to="/roles"><i className="fa fa-circle-o"></i>Roles</Link></li>
				            :null}
				            {props.permissions.admin_users_view ?
				            	<li><Link to="/users"><i className="fa fa-circle-o"></i>Usuarios</Link></li>
				            :null}
			          	</ul>
			        </li>
	        	:null}
	        	<li><Link to="/companies"><i className="fa fa-industry"></i> <span>Empresas</span></Link></li>
	        	<li><Link to="/orders"><i className="fa fa-cart-plus"></i>Pedidos</Link></li>
		       
	        </ul>
      	</section>
	</aside>
)
	
export default LeftPanel;