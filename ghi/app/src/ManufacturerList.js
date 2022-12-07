import React from 'react';
import {Link} from 'react-router-dom'

class ManufacturerList extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				manufacturers: [],
			};
		}

	async componentDidMount() {
		const url = 'http://localhost:8100/api/manufacturers/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			this.setState({ manufacturers: data.manufacturers });
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
                                    {this.state.manufacturers.map(manufacturer => {
                                        return (
                                            <tr key={manufacturer.id}>
                                                <td>{manufacturer.name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/manufacturers/new"
                                className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Manufacturer</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
}
export default ManufacturerList;



// 	async handleDelete(id) {
//         console.log('THIS ',id,' HERE');
//         const manufacturerUrl = `http://localhost:8100/api/manufacturers/${id}/`;
//         const fetchConfig = {
//             method: "delete",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         };

// 		const response = await fetch(manufacturerUrl, fetchConfig);

//         if (response.ok) {
//             this.componentDidMount();
//         }
//     }
// }
//   return (
//       <div>
//       <h3>Manufacturer List</h3>
//       <table className="table table-striped">
//           <thead>
//               <tr>
//                   <th>Name</th>
//                   <th>Manufacturer</th>
//                   <th>Delete</th>
//               </tr>
//           </thead>
//           <tbody>
//               {props.manufacturers.map(manufacturer => {
//                   return (
//                       <tr key={manufacturer.name}>
//                           <td>{ manufacturer.name }</td>
//                           <td>
//                               <button
//                               onClick={() => deleteManufacturer(manufacturer.id)}
//                               >Delete Manufacturer</button>
//                           </td>
//                       </tr>
//                   );
//               })}
//           </tbody>
//       </table>
//       </div>
//   );
// }
// export default ManufacturerList
