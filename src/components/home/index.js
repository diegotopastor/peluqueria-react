import FullCalendar from '@fullcalendar/react';
import resourceTimegrid from '@fullcalendar/resource-timegrid';

const Home = () => {

	return (
		
		<div className="row g-3">
			<div className="col">
				<h2>Home</h2>
				<p>Podría ser como Wordpress. Mostrar novedades, noticias, ...</p>
				<p>O mostrar directamente el calendario <a href="https://fullcalendar.io" target="_blank">fullcalendar.io</a></p>
				<FullCalendar
					plugins={[ resourceTimegrid ]}
					initialView="resourceTimeGridDay"
					resources={[
						{"id":1, "title":""},
						{"id":2, "title":""},
						{"id":3, "title":""},
						{"id":4, "title":""},
						{"id":5, "title":""}
					]}
					events={[
						{resourceId: 1, title: 'Marcado Ascensión', date: '2021-08-25'},
						{resourceId: 2, title: 'Depilar Diego', date: '2021-08-25 18:00:00'},
						{resourceId: 1, title: 'Corte Paco', start: '2021-08-25 19:00:00', end: '2021-08-25 20:30:00'}
					]}
				/>
			</div>
		</div>				

	);
}

export default Home;