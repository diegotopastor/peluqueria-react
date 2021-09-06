import React, {useState, useEffect} from 'react';
import API from "../../../config/api";
import Table from './table';

const CustomersList = () => {
	var [estado, cambiaEstado] = useState({datos:"loading"});

	// SOLAMENTE SE EJECUTA EN EL PRIMER RENDERIZADO
		useEffect(()=>{
			API.get("customers/get_list").then(respuesta=>{
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
		var html = <div>Crea un cliente primero.</div>;
	}else if(estado.datos==="loaded"){
		var html = <Table data={estado.data}/>;
	}

	return (
		<React.Fragment>
			<h2>Listado Clientes</h2>
			{html}
		</React.Fragment>		
		
	);
}

export default CustomersList;