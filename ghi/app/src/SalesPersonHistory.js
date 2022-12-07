import React from 'react';
import {Link} from 'react-router-dom'

class SalesPersonHistory extends React.Component {
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
	render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
							<h3>Sales Person History</h3>
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Sales Person</th>
                                        <th>Customer</th>
                                        <th>VIN</th>
                                        <th>Sale Price</th>
                                        <th>Payment Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.autos.map(auto => {
                                        return (
                                            <tr key={auto.vin}>
												<td>{auto.model.name}</td>
												<td>{auto.model.name}</td>
												<td>{auto.vin}</td>
												<td>{auto.id}</td>
												<td>Cash or Card</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/automobiles/new"
                                className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">Add a Personal Sale</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default SalesPersonHistory;
