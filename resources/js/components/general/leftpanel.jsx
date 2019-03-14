import React from 'react';
import {Link} from 'react-router-dom';

const LeftPanel = ()=>(

	<aside className="main-sidebar">
    
    	<section className="sidebar">
	      	<div className="user-panel">
	        	<div className="pull-left image">
	          		<img src="AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
	        	</div>
	        	<div className="pull-left info">
	          		<p>Alexander Pierce</p>
	          		<a href="#"><i className="fa fa-circle text-success"></i> Online</a>
	        	</div>
	      	</div>
      	</section>
	</aside>
)
	
export default LeftPanel;