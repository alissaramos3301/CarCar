import React from "react";
import { useNavigate } from 'react-router-dom'

function withNavigate(Component) {
	return (props) => <Component {...props}
		useNavigate={useNavigate()}
		/>;
}
class EmployeeForm extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		name: "",
		employee_number: "",
		// employees: []
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
	const newState = {}
	newState[event.target.name] = event.target.value;
	this.setState(newState);
	}

	// async componentDidMount() {
	// 	const url = 'http://localhost:8090/api/sales/'
	// 	const response = await fetch(url);
	// 	if (response.ok) {
	// 		const data = await response.json();
	// 		this.setState({employee: data.employee})
	// 	}
	// }

	async handleSubmit(event) {
		event.preventDefault();
		const data = { ...this.state };

		console.log(data)
		const url = "http://localhost:8090/api/employees/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			this.setState({
				name: "",
				employee_number: "",
			});
			this.props.useNavigate("/employees/");
		}
		// const newEmployee = await response.json();
		// this.setState({ employee: newEmployee.employees})
	}
	render() {
		return (
			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>Employee Form</h1>
						<form onSubmit={this.handleSubmit} id="create-employee-form">
							<div className="form-floating mb-3">
								<input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
								<label htmlFor="color">Full Name</label>
							</div>
							<div className="form-floating mb-3">
								<input onChange={this.handleChange} value={this.state.employee_number} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
								<label htmlFor="employee_number">Employee Number</label>
							</div>
						<button className="btn btn-primary">Welcome!</button>
						</form>
					</div>
				</div >
			</div >
		);
	}
}

export default withNavigate(EmployeeForm);
