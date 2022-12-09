import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-success">
		<div className="container-fluid">
			<NavLink className="navbar-brand" to="/">CarCar</NavLink>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
			<li className="nav-item">
				<NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/models">Vehicle Models</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/automobiles">Automobiles</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/automobiles/new">Add Automobiles</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/sales">Sales</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/sales/new">Add Sale</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/seller">Sales Person</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/seller/new">Add Sales Person</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/customers/new">Add Customer</NavLink>
				</li>
				<li className="nav-item">
				<NavLink className="nav-link" to="/automobiles/new">Add Automobiles</NavLink>
				</li>
				<li className="nav-item">
				<NavLink className="nav-link" to="/manufacturers/new">Add Manufacturers</NavLink>
				</li>
				<li className="nav-item">
				<NavLink className="nav-link" to="/models/new">Add Vehicle Model</NavLink>
				</li>
				<li className="nav-item">
				<NavLink className="nav-link" to="/customers">Customers</NavLink>
				</li>
			</ul>
			</div>
		</div>
		</nav>
	)
}

export default Nav;
