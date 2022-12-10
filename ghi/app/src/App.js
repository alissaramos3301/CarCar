import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import VehicleModelsList from './VehicleModelsList';
import AutomobilesList from './AutomobilesList';
import AutomobileForm from './AutomobileForm';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelsForm from './VehicleModelsForm';
import SalesList from './SalesList';
import EmployeeList from './EmployeeHistory';
import SaleForm from './SaleForm';
import EmployeeForm from './EmployeeForm';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';

function App(props) {
  // if (props.manufacturers === undefined && props.automobiles === undefined && props.models === undefined) {
  //   return null;
  // }
	return (
	<BrowserRouter>
		<Nav />
		<div className="container">
		<Routes>
			<Route path="/" element={<MainPage />}>
				<Route
					path='*'
					element={
						<main style={{ padding: '1rem' }}>
							<p>Nothing to see here!</p>
						</main>
					}
					/>
			</Route>
			<Route path="manufacturers" element={<ManufacturersList />} />
			<Route path="models" element={<VehicleModelsList />} />
			<Route path="automobiles" element={<AutomobilesList />} />
			<Route path="automobiles/new" element={<AutomobileForm />} />
			<Route path="sales" element={<SalesList />} />
			<Route path="sales/new" element={<SaleForm />} />
			<Route path="employee" element={<EmployeeList />} />
			<Route path="employee/new" element={<EmployeeForm />} />
			<Route path="customers" element={<CustomerList />} />
			<Route path='models/new' element={<VehicleModelsForm />} />
			<Route path='manufacturers/new' element={<ManufacturerForm />} />
			<Route path='customers/new' element={<CustomerForm />} />
		</Routes>
		</div>
	</BrowserRouter>
);
}

export default App;
