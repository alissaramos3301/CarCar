import React from "react";

class AutomobileForm extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		color: "",
		year: "",
		vin: "",
		model_id: "",
		models: []
	};

	this.handleColorChange = this.handleColorChange.bind(this);
	this.handleYearChange = this.handleYearChange.bind(this);
	this.handleVinChange = this.handleVinChange.bind(this);
	this.handleModelChange = this.handleModelChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleColorChange(event) {
	const value = event.target.value;
	this.setState({ color: value });
	}

	handleYearChange(event) {
	const value = event.target.value;
	this.setState({ year: value });
	}

	handleVinChange(event) {
	const value = event.target.value;
	this.setState({ vin: value });
	}

	handleModelChange(event) {
	const value = event.target.value;
	this.setState({ model_id: value });

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
			<h1>Automobile Form</h1>
			<form onSubmit={this.handleSubmit} id="create-automobile-form">
			<div className="form-floating mb-3">
				<input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
				<label htmlFor="color">Color</label>
			</div>
			<div className="form-floating mb-3">
				<input onChange={this.handleYearChange} value={this.state.year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
				<label htmlFor="year">Year</label>
			</div>
			<div className="form-floating label mb-3">
				<input onChange={this.handleVinChange} value={this.state.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
				<label htmlFor="vin">Vin</label>
			</div>
			<div className="form-floating mb-3">
				<select onChange={this.handleModelChange} placeholder="Model" required type="text" value={this.state.model_id} name="model" id="model" className="form-select">
				<option value="model">Model</option>
				{this.state.models.map((mod) => {
					return (
					<option key={mod.id} value={mod.id}>{mod.name} </option>
					)})}
				</select>
			</div>
			<button className="btn btn-primary">Create</button>
		</form>
		</div>
	</div >
	</div >
	);
}
}

export default AutomobileForm;
