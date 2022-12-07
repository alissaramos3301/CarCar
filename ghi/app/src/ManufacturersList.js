import React from 'react';
import {Link} from 'react-router-dom'

class ManufacturersList extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				manufacturers: [],
			};
		}

	async componentDidMount() {
		const url = 'http://localhost:8100/api/manufacturers/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			this.setState({ manufacturers: data.manufacturers });
		}
	}
	render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
                            <h3>Manufacturers</h3>
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.manufacturers.map(manufacturer => {
                                        return (
                                            <tr key={manufacturer.id}>
                                                <td>{manufacturer.name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/manufacturers/new"
                                className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Manufacturer</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
}
export default ManufacturersList;
