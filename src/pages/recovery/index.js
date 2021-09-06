const Recovery = () => {

	return(

		<div className="container mt-5">
			<div className="row mt-5 justify-content-center">
				<div className="col-md-4">				
					<div className="mt-5">
						<h1>Recuperar contraseña</h1>
						<input type="text" className="form-control form-control-lg" id="email" name="email" placeholder="email" required />
					</div>
					<div className="mt-3">
						<button className="form-control btn btn-lg btn-primary" id="submit" name="submit">Enviar</button>
					</div>							
				</div>
			</div>
		</div>

	);

}

export default Recovery;