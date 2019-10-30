import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

const Header = (props)=>(
	<header className="main-header">

    	<Link to="/" className="logo">
			<span className="logo-mini">
                <img src={"images/contraloria-logo.png"} style={{position:'relative', width:'100%'}}/>
            </span>
      		<span className="logo-lg">
                <img src={"images/contraloria.png"} style={{position:'relative', width:'100%', top:'-35px'}}/>
            </span>
    	</Link>

    	<nav className="navbar navbar-static-top">
      		<a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
        	   <span className="sr-only">Toggle navigation</span>
      		</a>

            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li className="dropdown user user-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <img src="plugins/AdminLTE/img/no-photo.png" className="user-image" alt="User Image" />
                            <span className="hidden-xs">{props.user.name}</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="user-header">
                                <img src="plugins/AdminLTE/img/no-photo.png" className="img-circle" alt="User Image" />
                                <p>
                                    {props.user.name}
                                    <small>{'Miembro desde '+moment(props.user.created_at).format('DD/MM/YYYY')}</small>
                                </p>
                            </li>
                            {/*Menu Footer*/}
                            <li className="user-footer">
                                <div className="pull-left">
                                    <a href="#" onClick={props.reset()} className="btn btn-default btn-flat">Cambiar Contraseña</a>
                                </div>
                                <div className="pull-right">
                                    <a href="#" onClick={props.logout()} className="btn btn-default btn-flat">Salir</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                            
                </ul>
            </div>
      	</nav>
	</header>
)

export default Header;