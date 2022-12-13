import React from 'react';
import {Link} from 'react-router-dom'

// function EmployeeSalesFiltered({sale}) {
//     return (
//         <tr key={sale.employee.id}>
//             <td>{sale.employee.name}</td>
//             <td>{sale.customer.name}</td>
//             <td>{sale.automobile.vin}</td>
//             <td>{sale.price}</td>
//         </tr>
//     )
// }

class EmployeeHistory extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            employee: '',
            employees: [],
            sales: [],
        };
        this.handleChange = this.handleChange.bind(this)
    }

    async handleChange(event) {
        const value = event.target.value;
        this.setState({employee: value});
        const url = 'http://localhost:8090/api/sales';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({sales: data.sales})
    }


	async componentDidMount() {
		const employeeUrl = 'http://localhost:8090/api/employees/';
		const response = await fetch(employeeUrl);

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
                            <div className='mb-3'>
                                <select onChange={this.handleChange} value={this.state.employee} required name='employee' id='employee' className='form-select'>
                                    <option value=''>Choose Employee</option>
                                    {this.state.employees?.map(employee => { return (<option key={employee.employee_number} value={employee.employee_number}>{employee.name}</option>) })}
                                </select>
                            </div>
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Employee</th>
                                        <th>Employee Number</th>
                                        <th>Customer</th>
                                        <th>Automobile</th>
                                        <th>Sale Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.sales.filter(x => x.employee.employee_number == this.state.employee).map(sale => {
                                        return (
                                            <tr key={sale.id}>
                                                <td>{sale.employee.name}</td>
                                                <td>{sale.employee.employee_number}</td>
                                                <td>{sale.customer.name}</td>
                                                <td>{sale.automobile.vin}</td>
                                                <td>{sale.price}</td>
                                                <td>Sold</td>
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
