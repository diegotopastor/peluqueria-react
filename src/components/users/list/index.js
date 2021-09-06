import React, {useState, useEffect} from 'react';
import API from "../../../config/api";
import Table from './table';

const UsersList = () => {
	var [estado, cambiaEstado] = useState({datos:"loading"});

	// SOLAMENTE SE EJECUTA EN EL PRIMER RENDERIZADO
		useEffect(()=>{
			API.get("users/get_list").then(respuesta=>{
				if(respuesta.status==false){
					cambiaEstado({datos:"nodata"});
				}else{
					cambiaEstado({datos:"loaded", data:respuesta.data});
				}
			});
		},[]);

	if(estado.datos === "loading"){
		var html = <div>Cargando...</div>;
	}else if(estado.datos==="nodata"){
		var html = <div>Crea un usuario primero.</div>;
	}else if(estado.datos==="loaded"){
		var html = <Table data={estado.data}/>;
	}

	return (
		<React.Fragment>
			<h2>Listado Usuarios</h2>
			{html}
		</React.Fragment>		
		
	);
}

export default UsersList;