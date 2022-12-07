import React from "react";


class VehicleModelsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            picture_url: "",
            manufacturer_id: "",
            manufacturers: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({ picture_url: value })
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer_id: value })
    }
    async fetchManufacturer() {
        const res = await fetch('http://localhost:8100/api/manufacturers');
        const NewManufacturer = await res.json();

        this.setState({ manufacturers: NewManufacturer.manufacturers })

    }
    componentDidMount() {
        this.fetchManufacturer()
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.manufacturers;
        console.log(data)
        const ModelsUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',

            },
        };
        const response = await fetch(ModelsUrl, fetchConfig);

        if (response.ok) {
            const NewModels = await response.json();
            console.log(NewModels)
            const cleared = {
                name: '',
                picture_url: '',
                manufacturer_id: '',
            };
            this.setState(cleared)
        }

    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a vehicle model</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePictureUrlChange} value={this.state.picture_url} placeholder="picture_url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                                <label htmlFor="name">Picture URL</label>

                            </div>
                            <div className="form-floating mb-3">
                                <select onChange={this.handleManufacturerChange} value={this.state.manufacturer_id} placeholder="manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-select">
                                    <option value="">Manufacturer</option>
                                    {console.log("this")}
                                    {console.log(this.state.manufacturers)}
                                    {console.log(this.state.manufacturers.length)}
                                    {this.state.manufacturers.map((man) => {
                                        return (
                                            <option key={man.id} value={man.id}>{man.name}  </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default VehicleModelsForm;
