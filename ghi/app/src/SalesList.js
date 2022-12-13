import React from 'react';
import {Link} from 'react-router-dom'

class SalesList extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				sales: [],
                employees: [],
                customers: [],
                autos: [],
                price: ''
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

    async handleDelete(id) {
        const url = `http://localhost:8090/api/sales/${id}`
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
							<h3>All Sales</h3>
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr key="">
                                        <th>Sales Employee</th>
                                        <th>Sales Employee Number</th>
                                        <th>Customer</th>
                                        <th>VIN</th>
                                        <th>Sale Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.sales.map(sale => {
                                        return (
                                            <tr key={sale.id}>
												<td>{sale.employee.name}</td>
												<td>{sale.employee.employee_number}</td>
                                                <td>{sale.customer.name}</td>
												<td>{sale.automobile.vin}</td>
												<td>{sale.price}</td>
												<td><button className="btn btn-dark" onClick={() => this.handleDelete(sale.id)}>Delete</button></td>
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
