// import React from "react";

// class AppointmentForm extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             vin: "",
//             owner: "",
//             date: "",
//             time: "",
//             technician: "",
//             technicians: [],
//             reason: "",
//         }
//         this.handleVinChange = this.handleVinChange.bind(this);
//         this.handleOwnerChange = this.handleOwnerChange.bind(this);
//         this.handleDateChange = this.handleDateChange.bind(this);
//         this.handleTimeChange = this.handleTimeChange.bind(this);
//         this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
//         this.handleReasonChange = this.handleReasonChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
        
//     }

//     async handleSubmit(event){
//         event.preventDefault();
//         const data = {...this.state};
//         delete data.technicians;
//         // console.log("123", data)
//         const appointmentUrl = "http://localhost:8080/api/appointments/"
//         const fetchConfig = {
//             method: "post",
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };
//         const response = await fetch(appointmentUrl, fetchConfig);
//         // console.log("response", response)
//         if(response.ok){
//             const newAppointment = await response.json();
//             console.log(newAppointment)

//             const cleared = {
//                 vin: "",
//                 owner: "",
//                 date: "",
//                 time: "",
//                 technician: [],
//                 reason: "",
//             }
//             this.setState(cleared)
//         }
//     }

//     handleVinChange(event){
//         const value = event.target.value
//         this.setState({vin:value})
//     }

//     handleOwnerChange(event){
//         const value = event.target.value
//         this.setState({owner:value})
//     }

//     handleDateChange(event){
//         const value = event.target.value
//         this.setState({date:value})
//     }

//     handleTimeChange(event){
//         const value = event.target.value
//         this.setState({time:value})
//     }

//     handleTechnicianChange(event){
//         const value = event.target.value
//         this.setState({technician:value})
//     }

//     handleReasonChange(event){
//         const value = event.target.value
//         this.setState({reason:value})
//     }

//     async componentDidMount(){
//         const url = "http://localhost:8080/api/technicians/"

//         const response = await fetch(url)
//         if(response.ok){
//             const data = await response.json();
//             this.setState({technicians: data.technicians})
//         }
//     }


import React from "react";

class AppointmentForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            vin: "",
            owner: "",
            date: "",
            time: "",
            technician: "",
            technicians: [],
            reason: "",
        };

        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleVinChange(event){
        const value = event.target.value;
        this.setState({vin:value})
    }

    handleOwnerChange(event){
        const value = event.target.value;
        this.setState({owner:value})
    }

    handleDateChange(event){
        const value = event.target.value;
        this.setState({date:value})
    }

    handleTimeChange(event){
        const value = event.target.value;
        this.setState({time:value})
    }

    handleTechnicianChange(event){
        const value = event.target.value;
        this.setState({technician:value})
    }

    handleReasonChange(event){
        const value = event.target.value;
        this.setState({reason:value})
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        delete data.date
        delete data.time
        delete data.technicians

        console.log(data)
        const AppointmentUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(AppointmentUrl, fetchConfig);

        if(response.ok){
            const NewAppointment = await response.json();
            console.log(NewAppointment);
            const cleared = {
                vin: "",
                owner: "",
                date: "",
                time: "",
                technician: [],
                reason: "",
            };
            this.setState(cleared)
        }
    }

    async componentDidMount(){
        const url = "http://localhost:8080/api/technicians/"

        const response = await fetch(url)
        if(response.ok){
            const data = await response.json();
            this.setState({technicians: data.technicians})
        }
    }

    render() {
        return(      
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create an appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-appointment-form">
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" value={this.state.vin} />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleOwnerChange} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" value={this.state.owner}  />
                                <label htmlFor="owner">Owner</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleDateChange} placeholder="Date" required type="date" name="date" id="date" className="form-control" value={this.state.date} />
                                <label htmlFor="date">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleTimeChange} placeholder="Time" required type="time" name="time" id="time" className="form-control" value={this.state.time} />
                                <label htmlFor="time">Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select onChange = {this.handleTechnicianChange} required name="technician" id="technician" className="form-select" value={this.state.technician}>
                                    <option value="">Choose a technician</option>
                                    {this.state.technicians.map(technician => {
                                        return (
                                            <option key = {technician.id} value = {technician.employee_number}>{technician.name} </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleReasonChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" value={this.state.reason} />
                                <label htmlFor="reason">Reason</label>
                            </div> 
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppointmentForm;
