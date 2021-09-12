import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import API from "../../../config/api";

const Table = (props) => {

	var [estado, cambiaEstado] = useState({deleted:null});
	var html = "";

	if(estado.deleted===true){
		var html = <div className="alert alert-success">Eliminado correctamente</div>;
	}

	const deleteCustomer = (id) =>{
		
		API.post('customers/delete/'+id)
			.then(respuesta=>{
				if(respuesta.status){
					cambiaEstado({deleted: true});
					document.getElementById("listcustomer"+id).remove();
				}else{
					cambiaEstado({deleted: false});
				}
			});
	}

	var customers = [];
	props.data.forEach(element => {

			customers.push(<tr className="align-middle" key={element.ID} id={"listcustomer"+element.ID}>
				<th scope="row">{element.ID}</th>
				<td>{element.name}</td>
				<td>{element.phone}</td>
				<td>{element.email}</td>
				<td>{element.created}</td>
				<td>
					<button type='button' className='btn btn-primary btn-icon'>
						<i className="far fa-calendar-alt"></i>
					</button>
					<Link to={`/app/customers/edit/`+element.ID} type='button' className='btn btn-success btn-icon mx-1'>
						<i className="far fa-edit"></i>
					</Link>
					<button onClick={()=>deleteCustomer(element.ID)} type='button' className='btn btn-danger btn-icon'>
						<i className="far fa-trash-alt"></i>
					</button>
				</td>
			</tr>);
	});

	return (
		<table className="table">
			<thead>
				<tr>
				<th scope="col">ID</th>
				<th scope="col">Nombre</th>
				<th scope="col">Teléfono</th>
				<th scope="col">Email</th>
				<th scope="col">Fecha Alta</th>
				<th scope="col">Acciones</th>
				</tr>
			</thead>
			<tbody>
				{customers}
			</tbody>
		</table>
	);
}

export default Table;