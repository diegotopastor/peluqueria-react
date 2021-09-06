import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import API from "../../config/api";

const Login = () => {

	var [estado, cambiaEstado] = useState({login:null});
	var html = "";

	if(estado.login===false){
		var html = <div className="alert alert-danger">Usuario y contraseña incorrectos</div>;
	}else if(estado.login===true){
		var html = <Redirect to="/app"></Redirect>;
	}

	const checklogin = () =>{
		const login = document.getElementById("email").value;
		const contra = document.getElementById("password").value;

		// PETICIÓN A LA API
		API.post('users/login', {email:login, password:contra})
			.then(respuesta=>{
				if(respuesta.status){
					// 1º GUARDAMOS EL TOKEN
						API.save_token(respuesta.data.token);
					// 2º QUE NOS MANDE A LA APP
						cambiaEstado({login:true});
				}else{
					cambiaEstado({login:false});
				}
			});

	}

	return(
		<div className="container mt-5">
			<div className="row mt-5 justify-content-center">
				<div className="col-md-4">				
					<div className="mt-5">
						<h1>Iniciar sesión</h1>
						<input type="text" className="form-control form-control-lg" id="email" name="email" placeholder="email" required />
					</div>
					<div className="mt-2">
						<input type="password" className="form-control form-control-lg" id="password" name="password" placeholder="password" required />
						<div className="mt-2 mb-2">
							<a href="#">Recordarme</a> | 
							<a href="#">Recuperar contraseña</a>
						</div>
					</div>
					{html}
					<div className="mt-3">
						<button onClick={checklogin} className="form-control btn btn-lg btn-primary" type="button">Entrar</button>
					</div>
				</div>
			</div>
		</div>

	);

}

export default Login;