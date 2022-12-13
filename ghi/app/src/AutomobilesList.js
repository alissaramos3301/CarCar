import React from 'react';
import {Link} from 'react-router-dom'

class AutomobilesList extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				autos: [],
			};
		}

	async componentDidMount() {
		const url = 'http://localhost:8100/api/automobiles/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			this.setState({ autos: data.autos });

		}
	}

    async handleDelete(id) {
        const url = `http://localhost:8100/api/automobiles/${id}`
        const fetchConfig = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, fetchConfig);
        if(response.ok) {
            this.componentDidMount();
        }
    }
	render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
							<h3>Automobiles</h3>
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>VIN</th>
                                        <th>Color</th>
                                        <th>Year</th>
                                        <th>Model</th>
                                        <th>Manufacturer</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.autos.map(auto => {
                                        return (
                                            <tr key={auto.vin}>
												<td>{auto.vin}</td>
												<td>{auto.color}</td>
												<td>{auto.year}</td>
												<td>{auto.model.name}</td>
												<td>{auto.model.manufacturer.name}</td>
												<td><button className="btn btn-light" onClick={() => this.handleDelete(auto.vin)}>Delete</button></td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/automobiles/new"
                                className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Automobile</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default AutomobilesList;
