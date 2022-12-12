import React from 'react'
import { useState, useEffect } from 'react';

export default function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    console.log(appointments)
    const [vin, setVin] = useState([]);

    const fetchAppointments = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const result = await fetch(url);
        const recordsJSON = await result.json();
        setAppointments(recordsJSON.appointments);
    }

    const fetchVin = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const result = await fetch(url);
        const recordsJSON = await result.json();
        setVin(recordsJSON.appointments.vin);
    }

    useEffect(() => {
        fetchAppointments()
    }, []);

    useEffect(() => {
        fetchVin()
    }, []);

    return (
        <div className="row">
            <div className="mt-4">
                <h1>Service History</h1>
                <input icon="search" type="text" className="search-input" aria-label="Default example" placeholder="Search VIN" onChange={(event) => {
                    setVin(event.target.value);
                }}
                    required
                    name="vin"
                    id="vin"
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason for visit</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments?.filter((appointment) => {
                        if (appointment.vin.includes(vin)) {
                            return appointment;
                        } else if (vin == null) {
                            return appointment;
                        }
                    }).map((appointment) => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                {/* <td>{new Date(appointment.appointment_datetime).toLocaleDateString()}</td>
                                <td>{new Date(appointment.appointment_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td> */}
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}



// import React, { useState, useEffect } from 'react';

// function AppointmentList(){
//   const [appointments, setAppointment] = useState([]);
//   // const [status, setStatus] = useState("")
 
//   async function fetchAppointment(){
//     const res = await fetch('http://localhost:8080/api/appointments');
//     const newAppointment = await res.json();
//     // console.log(newAppointment)
//     setAppointment(newAppointment.appointments.filter(record => record.status !== "finished"))
//       // console.log(status)
//   }

//     useEffect(()=> {
//       fetchAppointment()
//     }, [])


//   const cancel = async (e, id) => {
//     const url =`http://localhost:8080/api/appointments/${id}/`
//     const fetchConfig = {
//       method: 'PUT',
//       body: JSON.stringify({status:3}),
//       headers: {'Content-Type': 'application/json',}
      
//     }
//     const response = await fetch(url, fetchConfig)
//     if (response.ok) {
//       fetchAppointment()
//     }

//   }
   
//   const finished = async (id) => {
//     const url =`http://localhost:8080/api/appointments/${id}/`
//     const fetchConfig = {
//       method: 'PUT',
//       body: JSON.stringify({status:2}),
//       headers: {'Content-Type': 'application/json',}
      
//     }
//     const response = await fetch(url, fetchConfig)
//     if (response.ok) {
//       fetchAppointment()
//     }
//   }


//     return ( 
//         <>
//     <h1>Service appointments</h1>
//         <table className ="table table-striped">
//           <thead>        
//             <tr>
//               <th>VIN</th>
//               <th>Customer name</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Technician</th>
//               <th>Reason</th>
//               <th>VIP</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody> 
//              {appointments.map((each)=>{
//               return (
//                 <tr key={each.id}>
//                   <td>{each.vin.vin}</td>
//                   <td>{each.owner}</td>
//                   <td>{each.date.split("T")[0]}</td>
//                   <td>{each.time.slice(0,5)}</td>
//                   <td>{each.technician.name}</td>
//                   <td>{each.reason}</td>
//                   <td>{each.vip? "No":"Yes"}</td>
//                   <td>{each.status}</td>
//                   <td><button onClick={e=> cancel(e, each.id)} id={each.id} type="button" className="btn btn-danger rounded-0">Cancel</button><button onClick={()=> finished(each.id)} id={each.id} type="button" className="btn btn-success rounded-0">Finished</button></td>
//                 </tr>
//               )
//             })}
//             </tbody>
//             </table>
//             </>
//         );
//     }
    
// export default AppointmentList;
