import React from 'react';
import {Link} from 'react-router-dom'

class VehicleModelsList extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				models: [],
			};
		}

	async componentDidMount() {
		const url = 'http://localhost:8100/api/models/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			this.setState({ models: data.models });
		}
	}
	render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
                            <h3>Vehicle Models</h3>
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Manufacturer</th>
                                        <th>Picture</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.models.map(model => {
                                        return (
                                            <tr key={model.id}>
                                                <td>{model.name}</td>
                                                <td>{model.manufacturer.name}</td>
                                                <td><img style={{width:200}} src={model.picture_url} /></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/models/new"
                                className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Vehicle Model</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default VehicleModelsList;
