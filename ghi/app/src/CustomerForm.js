import React from "react";

class CustomerForm extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		name: "",
		address: "",
		phone_number: "",
	};

	this.handleTestChange = this.handleTestChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTestChange(event) {
	const value = event.target.value;
	this.setState({ test: value });
	}

	async fetchModel() {
	const res = await fetch('http://localhost:8100/api/customers');
	const newModel = await res.json();

	this.setState({ models: newModel.models })
	}

	componentDidMount() {
	this.fetchModel()
	}


	async handleSubmit(event) {
	event.preventDefault();
	const data = { ...this.state };
	delete data.models;

	console.log(data)
	const ModelsUrl = "http://localhost:8100/api/customers";
	const fetchConfig = {
		method: "post",
		body: JSON.stringify(data),
		headers: {
		'Content-Type': 'application/json',
		},
	};

    const response = await fetch(ModelsUrl, fetchConfig);

    if (response.ok) {
		const newModels = await response.json();
		console.log(newModels)
		const cleared = {
		name: '',
		address: '',
		phone_number: '',
		}
		this.setState(cleared)


	}
	}
	render() {
		return (
			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>New Customer</h1>
						<form onSubmit={this.handleTestChange} id="create-customer-form">
							<div className="form-floating mb-3">
								<input onChange={this.handleTestChange} value={this.state.color} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
								<label htmlFor="color">Full Name</label>
							</div>
							<div className="form-floating mb-3">
								<input onChange={this.handleTestChange} value={this.state.year} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
								<label htmlFor="year">Address</label>
							</div>
							<div className="form-floating mb-3">
								<input onChange={this.handleTestChange} placeholder="Phone Number" required type="number" name="number" id="number" className="form-control" />
								<label htmlFor="age">Phone Number</label>
							</div>
						<button className="btn btn-primary">Create</button>
						</form>
					</div>
				</div >
			</div >
		);
	}
}

export default CustomerForm;
