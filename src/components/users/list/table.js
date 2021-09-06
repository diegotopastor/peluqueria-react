import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
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

	var users = [];
	props.data.forEach(element => {

			users.push(
			<tr className="align-middle" key={element.ID} id={"listuser"+element.ID}>
				<th scope="row">{element.ID}</th>
				<td>{element.name}</td>
				<td>{element.email}</td>
				<td>{element.created}</td>
				<td>
					<Link to={`/app/users/edit/`+element.ID} type='button' className='btn btn-success btn-icon me-1'>
						<i className="far fa-edit"></i>
					</Link>
					<button onClick={()=>deleteUser(element.ID)} type='button' className='btn btn-danger btn-icon'>
						<i className="far fa-trash-alt"></i>
					</button>
				</td>
			</tr>);
			
	});

	return (
		<React.Fragment>
			{html}
			<table className="table">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Nombre</th>
						<th scope="col">Email</th>
						<th scope="col">Fecha Alta</th>
						<th scope="col">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{users}
				</tbody>
			</table>
		</React.Fragment>
	);
}

export default Table;