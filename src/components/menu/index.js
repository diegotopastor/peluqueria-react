import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

const Menu = () => {
	return (			

		<nav className="nav flex-column compMenu">
			<p className="nav-link h4">Empleados</p>
			<Link className="nav-link" to="/app/users/add" >Nuevo</Link>
			<Link className="nav-link" to="/app/users/get_list">Listado</Link>
			<p className="nav-link h4">Clientes</p>
			<Link className="nav-link" to="/app/customers/add">Nuevo</Link>
			<Link className="nav-link" to="/app/customers/get_list">Listado</Link>
			<p className="nav-link h4">Productos/Servicios</p>
			<Link className="nav-link" to="/app/items/add">Nuevo</Link>
			<Link className="nav-link" to="/app/items/get_list">Listado</Link>
		</nav>
	
		
	);
}

export default Menu;