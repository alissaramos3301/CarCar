import React, { useState, useEffect } from 'react';

function AppointmentHistory() {
  const[appointments, setAppointment] = useState([])
  const[search, setSearch] = useState('')

  const handleSetSearch = e => {
    setSearch(e.target.value)
  }

  async function fetchAppointment(){
    const res = await fetch('http://localhost:8080/api/appointments');
    const getData = await res.json();
    const appointmentArray = getData.appointments
    const result = appointmentArray.filter(item => item.vin.vin === search)
    setAppointment(result)
  }

  useEffect(()=> {
    fetchAppointment()
  },[])


  return(
        <>
        <br></br>
            <div className="input-group">
            <input type="text" value={search} onChange={handleSetSearch} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" onClick={fetchAppointment} className="btn btn-outline-secondary">Search VIN</button>
            </div>
              
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
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    {appointments.map((each)=>{
                      return(
                      <tr key={each.id}>
                      <td>{each.vin.vin}</td>
                      <td>{each.owner}</td>
                      <td>{each.date}</td>
                      <td>{each.time}</td>
                      <td>{each.technician.name}</td>
                      <td>{each.reason}</td>
                      <td>{each.status}</td>
                      </tr>
                      )
                    })}
                  
                  </tbody>
                </table>
                </>
        )
        }

export default AppointmentHistory
