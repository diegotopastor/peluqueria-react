import React, {useState} from 'react';
import API from "../../../config/api";

const UsersAdd = () => {

	var [estado, cambiaEstado] = useState({user:null});
	var html = "";

	if(estado.user===false){
		var html = <div className="alert alert-danger">No se han podido guardar los datos</div>;
	}else if(estado.user===true){
		var html = <div className="alert alert-success">Guardado correctamente</div>;;
	}

	const addUser = () =>{
		
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const pass = document.getElementById("pass").value;		

		// PETICIÓN A LA API
		API.post('users/add', {name:name, email:email, password:pass})
			.then(respuesta=>{
				if(respuesta.status){
					cambiaEstado({user:true});
				}else{
					cambiaEstado({user:false});
				}
			});

	}

	return (

		<div className="row g-3">
			<h2>Usuarios</h2>
			{html}
			<div className="col-md-6">
				<label  className="form-label">Nombre</label>
				<input type="text" className="form-control" id="name" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Email</label>
				<input type="email" className="form-control" id="email" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Password</label>
				<input type="password" className="form-control" id="pass" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Confirmar Password</label>
				<input type="password" className="form-control" id="confirm-pass" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Tipo usuario</label>
				<select className="form-select">
					<option value="administrator">Administrador</option>
					<option value="employee">Empleado</option>
				</select>
			</div>
			<div className="col-12">
				<button onClick={addUser} type="button" className="btn btn-primary">Guardar</button>
			</div>
		</div>

	);
}

export default UsersAdd;