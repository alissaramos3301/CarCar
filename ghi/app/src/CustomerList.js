import React from 'react';
import {Link} from 'react-router-dom'

class CustomerList extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				customers: [],
			};
		}

	async componentDidMount() {
		const url = 'http://localhost:8090/api/customers/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			this.setState({ customers: data.customers });
		}
	}
	render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
                            <h3>Customers</h3>
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <tr key={customer.id}>
                                                <td>{customer.name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/customers/new"
                                className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Customer</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
}
export default CustomerList;
