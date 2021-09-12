import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import API from "../../../config/api";

const CustomersEdit = (props) => {
	
	let [estado, cambiaEstado] = useState({status:"init"});
	const { register, handleSubmit } = useForm();

	// RECUPERAMOS DATOS A MOSTRAR
		useEffect(() =>{
			API.get('customers/get/'+props.idEdit).then(respuesta=>{
				if(respuesta.status){
					cambiaEstado({
						...estado,
						status: "loaded",
						name: respuesta.data.name,
						surname: respuesta.data.surname,
						phone: respuesta.data.phone,
						email: respuesta.data.email,
						customer_type: respuesta.data.customer_type,
						notes: respuesta.data.notes
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

	// EDITAMOS CUSTOMER
		const editCustomer = (datos) =>{

			console.log(datos);

			API.post('customers/edit/'+props.idEdit, datos)
				.then(respuesta=>{
					if(respuesta.status){
						cambiaEstado({...estado, status: "edited_OK"});
					}else{
						cambiaEstado({...estado, status: "edited_KO"});
					}
				});

		}
	
	return (
		
		(estado.status=="init"?
			"Cargando..." :
			<div className="row g-3">
				<h2>Editar Cliente</h2>
				{html}
				<div className="col-md-6">
					<label className="form-label">Nombre</label>
					<input type="text" className="form-control" defaultValue={estado.name} {...register("name")} />
				</div>
				<div className="col-md-6">
					<label className="form-label">Apellidos</label>
					<input type="text" className="form-control" defaultValue={estado.surname} {...register("surname")}/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Teléfono</label>
					<input type="tel" className="form-control" defaultValue={estado.phone} {...register("phone")}/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Email</label>
					<input type="email" className="form-control" defaultValue={estado.email} {...register("email")}/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Tipo cliente</label>
					<select className="form-select" {...register("content-type")}>
						<option value="new" selected={estado.content_type=="new"&&"selected"}>Nuevo</option>
						<option value="regular" selected={estado.content_type=="regular"&&"selected"}>Regular</option>
						<option value="vip" selected={estado.content_type=="vip"&&"selected"}>VIP</option>
					</select>
				</div>
				<div className="col-md-12">
					<label  className="form-label">Notas</label>
					<textarea className="form-control" id="notes" rows="3" defaultValue={estado.notes} {...register("notes")}></textarea>
				</div>
				<div className="col-12">
					<button onClick={handleSubmit(editCustomer)} type="button" className="btn btn-primary">Guardar</button>
				</div>
			</div>)		
		
	);
}

export default CustomersEdit;