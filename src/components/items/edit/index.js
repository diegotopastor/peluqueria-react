import React, {useState, useEffect} from 'react';
import API from "../../../config/api";

const Items = () => {

	var [estado, cambiaEstado] = useState({item:null});
	var html = "";

	if(estado.item===false){
		var html = <div className="alert alert-danger">No se han podido guardar los datos</div>;
	}else if(estado.item===true){
		var html = <div className="alert alert-success">Guardado correctamente</div>;;
	}

	const addItem = () =>{
		const brand = document.getElementById("brand").value;
		const product = document.getElementById("product").value;
		const description = document.getElementById("description").value;
		const price = document.getElementById("price").value;
		const iva = document.getElementById("iva").value;
		const stock = document.getElementById("stock").value;
		const typeItem = document.getElementById("typeItem").value;
		const duration = document.getElementById("duration").value;	

		// PETICIÓN A LA API
		API.post('items/add', {brands:brand, name:product, description:description, price:price, iva:iva, stock:stock, type:typeItem, duration:duration})
			.then(respuesta=>{
				if(respuesta.status){
					cambiaEstado({item:true});
				}else{
					cambiaEstado({item:false});
				}
			});

	}

	return (
		
		<div className="row g-3">
			<h2>Productos/Servicios</h2>
			{html}
			<div className="col-md-6">
				<label className="form-label">Producto</label>
				<input type="text" className="form-control" id="product" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Marca</label>
				<input type="text" className="form-control" id="brand" />
			</div>
			<div className="col-md-6">
				<label className="form-label">Producto/Servicio</label>
				<select className="form-select" id="typeItem">
					<option value="product">Producto</option>
					<option value="service">Servicio</option>
				</select>
			</div>
			<div className="col-md-12">
				<label className="form-label">Descripción</label>
				<textarea className="form-control" id="description" rows="3"></textarea>
			</div>
			<div className="col-md-3">
				<label className="form-label">Precio</label>
				<input type="number" className="form-control" id="price" min="0" />
			</div>
			<div className="col-md-3">
				<label className="form-label">IVA</label>
				<input type="number" className="form-control" id="iva" min="0" />
			</div>
			<div className="col-md-3">
				<label className="form-label">Stock</label>
				<input type="number" className="form-control" id="stock" min="0" />
				  	</div>
					<div className="col-md-3">
						<label className="form-label">Duración (min.)</label>
						<input type="number" className="form-control" id="duration" value="0" min="0" step="5" />
				  	</div>
					
					<div className="col-12">
					  	<button onClick={addItem} type="button" className="btn btn-primary">Guardar</button>
					</div>
				</div>
		
		
	);
}

export default Items;