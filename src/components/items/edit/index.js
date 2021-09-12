import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import API from "../../../config/api";

const ItemsEdit = (props) => {

	let [estado, cambiaEstado] = useState({status:"init"});
	const { register, handleSubmit } = useForm();

	// RECUPERAMOS DATOS A MOSTRAR
		useEffect(() =>{
			API.get('items/get/'+props.idEdit).then(respuesta=>{

				if(respuesta.status){
					cambiaEstado({
						...estado,
						status: "loaded",
						name: respuesta.data.name,
						brand: respuesta.data.brands,
						type: respuesta.data.type,
						description: respuesta.data.description,
						price: respuesta.data.price,
						iva: respuesta.data.iva,
						stock: respuesta.data.stock,
						duration: respuesta.data.duration
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
		const editItem = (datos) =>{

			console.log(datos);

			API.post('items/edit/'+props.idEdit, datos)
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
			<h2>Editar Productos/Servicios</h2>
			{html}
			<div className="col-md-6">
				<label className="form-label">Producto</label>
				<input type="text" className="form-control" defaultValue={estado.name} {...register("name")}/>
			</div>
			<div className="col-md-6">
				<label className="form-label">Marca</label>
				<input type="text" className="form-control" defaultValue={estado.brand} {...register("brands")}/>
			</div>
			<div className="col-md-6">
				<label className="form-label">Producto/Servicio</label>
				<select className="form-select" {...register("type")}>
					<option value="product" selected={estado.type=="product"&&"selected"}>Producto</option>
					<option value="service" selected={estado.type=="service"&&"selected"}>Servicio</option>
				</select>
			</div>
			<div className="col-md-12">
				<label className="form-label">Descripción</label>
				<textarea className="form-control" rows="3" defaultValue={estado.description} {...register("description")}></textarea>
			</div>
			<div className="col-md-3">
				<label className="form-label">Precio</label>
				<input type="number" className="form-control" min="0" defaultValue={estado.price} {...register("price")} />
			</div>
			<div className="col-md-3">
				<label className="form-label">IVA</label>
				<input type="number" className="form-control" min="0" defaultValue={estado.iva} {...register("iva")} />
			</div>
			<div className="col-md-3">
				<label className="form-label">Stock</label>
				<input type="number" className="form-control" min="0" defaultValue={estado.stock} {...register("stock")} />
				  	</div>
					<div className="col-md-3">
						<label className="form-label">Duración (min.)</label>
						<input type="number" className="form-control" min="0" step="5" defaultValue={estado.duration} {...register("duration")} />
				  	</div>
					
					<div className="col-12">
					  	<button onClick={handleSubmit(editItem)} type="button" className="btn btn-primary">Guardar</button>
					</div>
				</div>
		
		
	);
}

export default ItemsEdit;