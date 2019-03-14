import React from 'react';
import {Link} from 'react-router-dom';

const Header = ()=>(
	<header className="main-header">

    	<Link to="/" className="logo">
			<span className="logo-mini"><b>Sys</b>Adm</span>
      		<span className="logo-lg"><b>Sys</b>Admin</span>
    	</Link>

    	<nav className="navbar navbar-static-top">
      		<a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
        	<span className="sr-only">Toggle navigation</span>
      		</a>
      	</nav>
	</header>
)

export default Header;