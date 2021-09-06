import React, {useState, useEffect} from 'react';
import API from "../../../config/api";

const CustomersAdd = () => {
	
	var [estado, cambiaEstado] = useState({customer:null, error:null});
	var html = "";

	if(estado.customer===false){
		var html = <div className="alert alert-danger">{estado.error}</div>;
	}else if(estado.customer===true){
		var html = <div className="alert alert-success">Guardado correctamente</div>;;
	}

	const addCustomer = () =>{
		const name = document.getElementById("name").value;
		const surname = document.getElementById("surname").value;
		const email = document.getElementById("email").value;
		const phone = document.getElementById("phone").value;
		const notes = document.getElementById("notes").value;
		const customerType = document.getElementById("customerType").value;

		// PETICIÓN A LA API
		API.post('customers/add', {name:name, surname:surname, email:email, phone:phone, notes:notes, customer_type:customerType})
			.then(respuesta=>{
				if(respuesta.status){
					cambiaEstado({customer:true});
				}else{
					cambiaEstado({customer:false, error:respuesta.error});
				}
			});

	}
	
	return (
		
		<div className="row g-3">
			<h2>Clientes</h2>
			{html}
			<div className="col-md-6">
				<label className="form-label">Nombre</label>
				<input type="text" className="form-control" id="name" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Apellidos</label>
				<input type="text" className="form-control" id="surname" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Teléfono</label>
				<input type="tel" className="form-control" id="phone" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Email</label>
				<input type="email" className="form-control" id="email" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Tipo cliente</label>
				<select className="form-select" id="customerType">
					<option value="new">Nuevo</option>
					<option value="regular">Regular</option>
					<option value="vip">VIP</option>
				</select>
			</div>
			<div className="col-md-12">
				<label  className="form-label">Notas</label>
				<textarea className="form-control" id="notes" rows="3" id="notes"></textarea>
			</div>
			<div className="col-12">
				<button onClick={addCustomer} type="button" className="btn btn-primary">Guardar</button>
			</div>
		</div>		
		
	);
}

export default CustomersAdd;