import React from "react";
import { useNavigate } from 'react-router-dom'

function withNavigate(Component) {
	return (props) => <Component {...props}
		useNavigate={useNavigate()}
		/>;
}

class SaleForm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        automobile: "",
        employee: "",
        customer: "",
        price: "",
        customers: [],
        autos: [],
        employees: []
    };
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handleAutoChange = this.handleAutoChange.bind(this);
    this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const newState = {}
        newState[event.target.name] = event.target.value;
        this.setState({ newState });
    }
    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value})
    }
    handleAutoChange(event) {
        const value = event.target.value;
        this.setState({ auto: value})
    }
    handleEmployeeChange(event) {
        const value = event.target.value;
        this.setState({ employee: value})
        console.log(value)
    }
    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({ price: value})
    }


    async fetchAuto() {
        const response = await fetch('http://localhost:8100/api/automobiles');
        const newAuto = await response.json();

        this.setState({ autos: newAuto.autos })
    }
    async fetchEmployee() {
        const response = await fetch('http://localhost:8090/api/employees');
        if (response.ok) {
            const employeeData = await response.json()
            this.setState({ employees: employeeData.employees})
        }
    }
    async fetchCustomer() {
        const response = await fetch('http://localhost:8090/api/customers');
        const newCustomer = await response.json();

        this.setState({ customers: newCustomer.customers })
    }
    componentDidMount() {
        this.fetchAuto()
        this.fetchEmployee()
        this.fetchCustomer()
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            automobile: this.state.auto,    //this is what we want in insomnia
            employee: this.state.employee,
            customer: this.state.customer,
            price: this.state.price,
        }
        console.log('console logging data under handleSubmit')
        console.log(data)
        const url = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        console.log(fetchConfig)
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            console.log("HERE IS THE RESPONSE IN THE FETCH")
            console.log(response)
            this.setState({
                auto: '',
                employee: '',
                customer: '',
                price: '',
            })
            this.props.useNavigate("/sales")
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a new Sale</h1>
                        <form onSubmit={this.handleSubmit} multiple={true} id="create-sale-form">
                            <div className="form-floating mb-3">
                                <select onChange={this.handleAutoChange} value={this.state.auto} placeholder="Auto" required type="text" name="auto" id="auto" className="form-select">
                                    <option key="auto" value="auto">Choose an automobile</option>
                                    {this.state.autos.map((auto) => {
                                        return (
                                        <option key={auto.vin} value={auto.vin}>{auto.vin} </option>
                                        )})}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <select onChange={this.handleEmployeeChange} value={this.state.employee} placeholder="Employee" required type="text" name="employee" id="employee" className="form-select">
                                    <option key="employee" value="employee">Choose an employee</option>
                                    {this.state.employees.map((employee) => {
                                        return (
                                        <option key={employee.id} value={employee.id}>{employee.employee_number} </option>
                                        )})}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <select onChange={this.handleCustomerChange} value={this.state.customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-select">
                                    <option key="customer" value="customer">Choose a customer</option>
                                    {this.state.customers.map((customer) => {
                                        return (
                                        <option key={customer.import_href} value={customer.import_href}>{customer.name} </option>
                                        )})}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePriceChange} value={this.state.price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
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

export default withNavigate(SaleForm);
