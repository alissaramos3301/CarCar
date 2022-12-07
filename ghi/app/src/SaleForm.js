import React from "react";

class SalesForm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        color: "",
        year: "",
        vin: "",
        model_id: "",
        models: []
    };

    // this.handleSubmit = this.handlePrice.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handlePriceChange(event) {
    //     const value = event.target.value;
    //     this.setState({ price: value });
    //     }

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
                <h1>Record a new Sale</h1>
                <form onSubmit={this.handleSubmit} id="create-sale-form">
                    <div className="form-floating mb-3">
                        <select onChange={this.handleTestChange} placeholder="Automobile" required type="text" value={this.state.model_id} name="automobile" id="automobile" className="form-select">
                            <option value="automobile">Choose an automobile</option>
                            {this.state.models.map((mod) => {
                                return (
                                <option key={mod.id} value={mod.id}>{mod.name} </option>
                                )})}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <select onChange={this.handleTestChange} placeholder="Sales Person" required type="text" value={this.state.model_id} name="sales_person" id="sales_person" className="form-select">
                            <option value="sales_person">Choose a sale person</option>
                            {this.state.models.map((mod) => {
                                return (
                                <option key={mod.id} value={mod.id}>{mod.name} </option>
                                )})}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <select onChange={this.handleTestChange} placeholder="Customer" required type="text" value={this.state.model_id} name="customer" id="customer" className="form-select">
                            <option value="customer">Choose a customer</option>
                            {this.state.models.map((mod) => {
                                return (
                                <option key={mod.id} value={mod.id}>{mod.name} </option>
                                )})}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleTestChange} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-primary">It's sold!</button>
                </form>
            </div>
        </div >
    </div >
    );
}
}

export default SalesForm;
