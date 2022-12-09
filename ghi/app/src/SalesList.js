import React from 'react';
import {Link} from 'react-router-dom'

class SalesList extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				sales: [],
			};
		}

	async componentDidMount() {
		const url = 'http://localhost:8090/api/sales/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			this.setState({ sales: data.sales });
		}
	}
	render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
							<h3>All Sales</h3>
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Sales Person</th>
                                        {/* <th>Customer</th>
                                        <th>VIN</th>
                                        <th>Sale Price</th> */}
                                        <th>Payment Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.sales.map(sale => {
                                        return (
                                            <tr key={sale.id}>
												<td>{sale.name}</td>
												{/* <td>{sales.name}</td>
												<td>{sales.name}</td>
												<td>{sales.name}</td> */}
												<td>Cash or Card</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/sales/new"
                                className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">Add New Sale</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default SalesList;
