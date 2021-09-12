import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import API from "../../../config/api";

const Table = (props) => {

	var [estado, cambiaEstado] = useState({deleted:null});
	var html = "";

	if(estado.deleted===true){
		var html = <div className="alert alert-success">Eliminado correctamente</div>;
	}

	const deleteUser = (id) =>{
		
		API.post('users/delete/'+id)
			.then(respuesta=>{
				if(respuesta.status){
					cambiaEstado({deleted: true});
					document.getElementById("listuser"+id).remove();
				}else{
					cambiaEstado({deleted: false});
				}
			});
	}

	// CONFIGURAMOS LA TABLA
		const columns = [
			{ name: 'ID', 			selector: row=> row.id, 		sortable: true },
			{ name: 'Nombre', 		selector: row=> row.nombre, 	sortable: true },
			{ name: 'Email', 		selector: row=> row.email, 		sortable: true },
			{ name: 'Fecha Alta', 	selector: row=> row.fechaAlta,	sortable: true },
			{ name: 'Acciones',		selector: row=> row.acciones }
		];

	// PINTAMOS LA TABLA CON LOS DATOS
		var users = [];		
		props.data.forEach(element => {

			users.push(
				{
					id: element.ID,
					nombre: element.name,
					email: element.email,
					fechaAlta: element.created,
					acciones:
						<React.Fragment> 
							<Link to={`/app/users/edit/`+element.ID} type='button' className='btn btn-success btn-icon me-1'><i className="far fa-edit"></i></Link>
							<button onClick={()=>deleteUser(element.ID)} type='button' className='btn btn-danger btn-icon'><i className="far fa-trash-alt"></i></button>
						</React.Fragment>

				}
			);
			
		});

	return (
		<React.Fragment>
			{html}
			<DataTable
				columns={columns}
				data={users}
				pagination
				fixedHeader
			/>
		</React.Fragment>
	);
}

export default Table;