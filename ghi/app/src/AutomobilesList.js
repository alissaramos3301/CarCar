import React from 'react';
import {Link} from 'react-router-dom'

class AutomobilesList extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				autos: [],
			};
		}

	async componentDidMount() {
		const url = 'http://localhost:8100/api/automobiles/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			this.setState({ autos: data.autos });

		}
	}
	render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
                            <table className="table table-success table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.autos.map(auto => {
                                        return (
                                            <tr key={auto.vin}>
												<td>{auto.vin}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/automobiles/new"
                                className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Automobile</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default AutomobilesList;
