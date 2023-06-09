import React from "react";
import { useNavigate } from 'react-router-dom'

function withNavigate(Component) {
	return (props) => <Component {...props}
		useNavigate={useNavigate()}
		/>;
}

class CustomerForm extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		name: "",
		address: "",
		phone: "",
		// customers: []
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
	const newState = {};
	newState[event.target.name] = event.target.value;
	this.setState(newState);
	}

	// async componentDidMount() {
	// 	const url = 'http://localhost:8090/api/customers/'
	// 	const response = await fetch(url);
	// 	if (response.ok) {
	// 		const data = await response.json();
	// 		this.setState({customer: data.customer})
	// 	}
	// }

	async handleSubmit(event) {
		event.preventDefault();
		const data = { ...this.state };

		const customersUrl = "http://localhost:8090/api/customers/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
			'Content-Type': 'application/json',
			}
		}
		const response = await fetch(customersUrl, fetchConfig);
		if (response.ok) {
			// const newCustomer = await response.json();
			// console.log(newCustomer)
			this.setState({
				name: '',
				address: '',
				phone: '',
				// customer: '',
			});
			this.props.useNavigate("/sales/new");
		}
		// const newCustomer = await response.json();
		// this.setState({ customers: newCustomer.customers })
	}
	render() {
		return (
			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>New Customer</h1>
						<form onSubmit={this.handleSubmit} id="create-customer-form">
							<div className="form-floating mb-3">
								<input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
								<label htmlFor="name">Full Name</label>
							</div>
							<div className="form-floating mb-3">
								<input onChange={this.handleChange} value={this.state.address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
								<label htmlFor="address">Address</label>
							</div>
							<div className="form-floating mb-3">
								<input onChange={this.handleChange} value={this.state.phone} placeholder="Phone" required type="number" name="phone" id="phone" className="form-control" />
								<label htmlFor="phone">Phone Number</label>
							</div>
						<button className="btn btn-primary">Create</button>
						</form>
					</div>
				</div >
			</div >
		);
	}
}

// export default CustomerForm;
export default withNavigate(CustomerForm);
