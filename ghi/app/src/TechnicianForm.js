import React from 'react'

class TechnicianForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            employee_number: "",
        };

        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(event){
        const value = event.target.value
        this.setState({ name: value});
    }

    handleEmployeeNumberChange(event){
        const value = event.target.value
        this.setState({ employee_number: value});
    }
    
    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        // console.log("!@#$@", data)
        const url = "http://localhost:8080/api/technicians/"; 
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig);
        // console.log("!@#m", response)
        if (response.ok) {
          const newTech = await response.json();
          console.log(newTech);
          const cleared = {
            name:'',
            employee_number:'',
          };
          this.setState(cleared)
    }
    }
render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a technician</h1>
            <form onSubmit = {this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input onChange ={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name} />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={this.handleEmployeeNumberChange} placeholder="Employee number" required type="number" name="employee_number" id="employee_number" className="form-control" value={this.state.employee_number} />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
        );
      }
}
export default TechnicianForm;
