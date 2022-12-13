import React from 'react';
import {Link} from 'react-router-dom'

class EmployeeHistory extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				employees: [],
			};
		}

	async componentDidMount() {
		const url = 'http://localhost:8090/api/employees/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			this.setState({ employees: data.employees });

		}
	}
	render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
							<h3>Employee Sales History</h3>
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Employee</th>
                                        <th>Customer</th>
                                        {/* <th>VIN</th> */}
                                        {/* <th>Sale Price</th> */}
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.employees.map(employee => {
                                        return (
                                            <tr key={employee.name}>
												<td>{employee.name}</td>
												<td>{employee.name}</td>
												{/* <td>{employee.vin}</td> */}
												{/* <td>{employee.id}</td> */}
												<td>Sold or Available</td>
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
export default EmployeeHistory;
