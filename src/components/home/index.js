import React, {useState, useEffect} from 'react';
import API from '../../config/api';
import FullCalendar from '@fullcalendar/react';
import resourceTimegrid from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Home = () => {

	// 1º UseEffect que solamente se ejecuta una vez
		// Petición API: que saca todas las citas
			//en el then()
				// 1º Parsear el resultado y sacar todos los trabajadores que existen DIFERENTE
				// 2º Crear otro array de objetos con TODAS las citas en formato
		// ¿Que necesita devolver la API?
			// ID_trabajador, nombre trabajador, ID_cita, título, fecha, duración
	
	let [estado, cambiaEstado] = useState({status:"init"});

	// RECUPERAMOS DATOS A MOSTRAR
	useEffect(() =>{
		API.get('dates/get_list').then(respuesta=>{
			if(respuesta.status){
				cambiaEstado({
					...estado,
					status: "loaded",
					dates: respuesta.data					
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

	return (
		
		<div className="row g-3">
			<div className="col">
				<h2>Home</h2>
				<p>Podría ser como Wordpress. Mostrar novedades, noticias, ...</p>
				<p>O mostrar directamente el calendario <a href="https://fullcalendar.io" target="_blank">fullcalendar.io</a></p>

				<FullCalendar
					locale='es'
					plugins={[ resourceTimegrid, interactionPlugin ]}
					initialView="resourceTimeGridDay"
					// selectable={true}
					// select={(e)=>console.log(e)}
					dateClick={(e)=>console.log(e)}					
					resources={[
						{"id":1, "title":""},
						{"id":2, "title":""},
						{"id":3, "title":""},
						{"id":4, "title":""},
						{"id":5, "title":""}
					]}
					events={[
						{resourceId: 1, title: 'Marcado Ascensión', date: '2021-09-11'},
						{resourceId: 2, title: 'Depilar Diego', date: '2021-09-11 18:00:00'},
						{resourceId: 1, title: 'Corte Paco', start: '2021-09-11 19:00:00', end: '2021-09-11 20:30:00'}
					]}
				/>
			</div>
		</div>				

	);
}

export default Home;