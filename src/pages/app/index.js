import React from 'react';
import Navbar from '../../components/navbar';
import Home from '../../components/home';
import Menu from '../../components/menu';

import UsersAdd from '../../components/users/add';
import UsersEdit from '../../components/users/edit';
import UsersList from '../../components/users/list';
import CustomersAdd from '../../components/customers/add';
import CustomersList from '../../components/customers/list';
import ItemsAdd from '../../components/items/add';
import ItemsList from '../../components/items/list';

const App = (props) => {

	const url = props.match.params?.action + "/" + props.match.params?.method;

	switch(url){
		case "users/add":
			var componente = <UsersAdd/>;
			break;
		case "users/edit":
			var componente = <UsersEdit idEdit={props.match.params.id}/>;
			break;
		case "users/get_list":
			var componente = <UsersList/>;
			break;
		case "customers/add":
			var componente = <CustomersAdd/>;
			break;
		case "customers/get_list":
			var componente = <CustomersList/>;
			break;
		case "items/add":
			var componente = <ItemsAdd/>;
			break;
		case "items/get_list":
			var componente = <ItemsList/>;
			break;
		default:
			var componente = <Home/>;
	}

	return(

		<React.Fragment>
			<Navbar/>
			<div className="container mt-5 mb-5">
				<div className="row">
					<div className="col-md-3">
						<Menu/>
					</div>
					<div className="col-md-9">
						{componente}
					</div>
				</div>
			</div>
		</React.Fragment>

	);

}

export default App;