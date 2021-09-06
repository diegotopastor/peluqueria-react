import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import API from "../../../config/api";

const Table = (props) => {

	var [estado, cambiaEstado] = useState({deleted:null});
	var html = "";

	if(estado.deleted===true){
		var html = <div className="alert alert-success">Eliminado correctamente</div>;
	}

	const deleteItem = (id) =>{
		
		API.post('items/delete/'+id)
			.then(respuesta=>{
				if(respuesta.status){
					cambiaEstado({deleted: true});
					document.getElementById("listitem"+id).remove();
				}else{
					cambiaEstado({deleted: false});
				}
			});
	}

	var items = [];
	props.data.forEach(element => {

			items.push(<tr className="align-middle" key={element.ID} id={"listitem"+element.ID}>
				<th scope="row">{element.ID}</th>
				<td>{element.name}</td>
				<td>{element.brands}</td>
				<td>{element.description}</td>
				<td>{element.price}</td>
				<td>{element.iva}</td>
				<td>{element.stock}</td>
				<td>
					<Link to={`/app/items/edit/`+element.ID} type='button' className='btn btn-success btn-icon me-1'>
						<i className="far fa-edit"></i>
					</Link>
					<button onClick={()=>deleteItem(element.ID)} type='button' className='btn btn-danger btn-icon'>
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
					<th scope="col">Producto</th>
					<th scope="col">Marca</th>
					<th scope="col">Descripción</th>
					<th scope="col">Precio</th>
					<th scope="col">IVA</th>
					<th scope="col">Stock</th>
					<th scope="col">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</table>
		</React.Fragment>
	);
}

export default Table;