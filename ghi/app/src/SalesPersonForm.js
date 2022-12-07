import React from "react";

class SalesPersonForm extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		color: "",
		year: "",
		vin: "",
		model_id: "",
		models: []
	};

	this.handleTestChange = this.handleTestChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTestChange(event) {
	const value = event.target.value;
	this.setState({ test: value });
	}

	async fetchModel() {
	const res = await fetch('http://localhost:8100/api/models');
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
	const ModelsUrl = "http://localhost:8100/api/automobiles/";
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
		color: '',
		year: '',
		vin: '',
		model_id: '',
		}
		this.setState(cleared)


	}
	}
	render() {
		return (
			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>Welcome to Sales</h1>
						<form onSubmit={this.handleTestChange} id="create-autombile-form">
							<div className="form-floating mb-3">
								<input onChange={this.handleTestChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
								<label htmlFor="color">Full Name</label>
							</div>
							<div className="form-floating mb-3">
								<input onChange={this.handleTestChange} value={this.state.year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
								<label htmlFor="year">Position</label>
							</div>
							<div className="form-floating mb-3">
								<input onChange={this.handleTestChange} placeholder="Age" required type="number" name="age" id="age" className="form-control" />
								<label htmlFor="age">Age</label>
							</div>
							<div className="form-floating mb-3">
								<select onChange={this.handleTestChange} placeholder="Model" required type="text" value={this.state.model_id} name="model" id="model" className="form-select">
									<option value="model">Hire Date</option>
									{this.state.models.map((mod) => {
										return (
											<option key={mod.id} value={mod.id}>{mod.name} </option>
										)
									})}
								</select>
							</div>
						<button className="btn btn-primary">Welcome!</button>
						</form>
					</div>
				</div >
			</div >
		);
	}
}

export default SalesPersonForm;
