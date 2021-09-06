import React, {useState, useEffect} from 'react';
import API from "../../../config/api";

const UsersEdit = (props) => {

	let [estado, cambiaEstado] = useState({status:"init", name: "", email: "" });

	// RECUPERAMOS DATOS A MOSTRAR
		useEffect(() =>{
			API.get('users/get/'+props.idEdit).then(respuesta=>{
				if(respuesta.status){
					cambiaEstado({
						...estado,
						status: "loaded",
						name: respuesta.data.name,
						email: respuesta.data.email
					});
				}else{
					// SI EXISTE ERROR
					cambiaEstado({ ...estado, status: "error" });
				}
			});
		},[]);

	// CONTROL DE ERRORES
		if(estado.status==="error"){
			var html = <div className="alert alert-danger">Error al cargar datos</div>;
		}else if(estado.status==="edited_KO"){
			var html = <div className="alert alert-danger">Error al editar datos</div>;
		}else if(estado.status==="edited_OK"){
			var html = <div className="alert alert-success">Editado correctamente</div>;
		}else{
			var html = "";
		}

	// EDITAMOS USUARIO
		const editUser = () =>{

			API.post('users/edit/'+props.idEdit, {name:estado.name, email:estado.email})
				.then(respuesta=>{
					if(respuesta.status){
						cambiaEstado({...estado, status: "edited_OK"});
					}else{
						cambiaEstado({...estado, status: "edited_KO"});
					}
				});

		}

	return (

		<div className="row g-3">
			<h2>Editar Usuario {props.idEdit}</h2>
			{html}
			<div className="col-md-6">
				<label  className="form-label">Nombre</label>
				<input type="text" className="form-control" onChange={e => cambiaEstado({...estado,"name": e.target.value })} value={estado.name}/>
			</div>
			<div className="col-md-6">
				<label className="form-label">Email</label>
				<input type="email" className="form-control"  onChange={e => cambiaEstado({...estado,"email": e.target.value })} id="email" value={estado.email}/>
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
				<button onClick={editUser} type="button" className="btn btn-primary">Guardar</button>
			</div>
		</div>

	);
}

export default UsersEdit;