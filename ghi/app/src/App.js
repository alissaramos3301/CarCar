import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import VehicleModelsList from './VehicleModelsList';
import AutomobilesList from './AutomobilesList';

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
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="models" element={<VehicleModelsList />} />
          <Route path="automobiles" element={<AutomobilesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
