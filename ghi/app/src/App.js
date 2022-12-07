import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import VehicleModelsList from './VehicleModelsList';
import AutomobilesList from './AutomobilesList';
import AutomobileForm from './AutomobileForm';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelsForm from './VehicleModelsForm';

function App(props) {
  // if (props.manufacturers === undefined && props.automobiles === undefined && props.models === undefined) {
  //   return null;
  // }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturersList />} />
          <Route path="models" element={<VehicleModelsList />} />
          <Route path="automobiles" element={<AutomobilesList />} />
          <Route path="automobiles/new" element={<AutomobileForm />} />
          <Route path="manufacturers/new" element={<ManufacturerForm />} />
          <Route path="models/new" element={<VehicleModelsForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
