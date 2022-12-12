import React, { useState, useEffect } from 'react';

function AppointmentList(){
  const [appointments, setAppointment] = useState([]);
  // const [status, setStatus] = useState("")
 
  async function fetchAppointment(){
    const res = await fetch('http://localhost:8080/api/appointments');
    const newAppointment = await res.json();
    // console.log(newAppointment)
    setAppointment(newAppointment.appointments.filter(record => record.status !== "finished"))
      // console.log(status)
  }

    useEffect(()=> {
      fetchAppointment()
    }, [])


  const cancel = async (e, id) => {
    const url =`http://localhost:8080/api/appointments/${id}/`
    const fetchConfig = {
      method: 'PUT',
      body: JSON.stringify({status:3}),
      headers: {'Content-Type': 'application/json',}
      
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      fetchAppointment()
    }

  }
   
  const finished = async (id) => {
    const url =`http://localhost:8080/api/appointments/${id}/`
    const fetchConfig = {
      method: 'PUT',
      body: JSON.stringify({status:2}),
      headers: {'Content-Type': 'application/json',}
      
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      fetchAppointment()
    }
  }


    return ( 
        <>
    <h1>Service appointments</h1>
        <table className ="table table-striped">
          <thead>        
            <tr>
              <th>VIN</th>
              <th>Customer name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>VIP</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody> 
             {appointments.map((each)=>{
              return (
                <tr key={each.id}>
                  <td>{each.vin.vin}</td>
                  <td>{each.owner}</td>
                  <td>{each.date.split("T")[0]}</td>
                  <td>{each.time.slice(0,5)}</td>
                  <td>{each.technician.name}</td>
                  <td>{each.reason}</td>
                  <td>{each.vip? "No":"Yes"}</td>
                  <td>{each.status}</td>
                  <td><button onClick={e=> cancel(e, each.id)} id={each.id} type="button" className="btn btn-danger rounded-0">Cancel</button><button onClick={()=> finished(each.id)} id={each.id} type="button" className="btn btn-success rounded-0">Finished</button></td>
                </tr>
              )
            })}
            </tbody>
            </table>
            </>
        );
    }
    
export default AppointmentList;
