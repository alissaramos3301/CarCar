import React from 'react';
import {Link} from 'react-router-dom'

class SalesPersonHistory extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				sellers: [],
			};
		}

	async componentDidMount() {
		const url = 'http://localhost:8090/api/sellers/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			this.setState({ sellers: data.sellers });

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
                                        {/* <th>VIN</th> */}
                                        {/* <th>Sale Price</th> */}
                                        <th>Payment Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.sellers.map(seller => {
                                        return (
                                            <tr key={seller.name}>
												<td>{seller.name}</td>
												<td>{seller.name}</td>
												{/* <td>{seller.vin}</td> */}
												{/* <td>{seller.id}</td> */}
												<td>Cash or Card</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/sales/new"
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
