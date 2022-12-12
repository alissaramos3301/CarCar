import React from 'react'
import { useState, useEffect } from 'react';

export default function AppointmentHistory() {
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

    async function deleteAppointment(id) {
      const url = `http://localhost:8080/api/appointments/`;
      const result = await fetch(url, { method: 'DELETE' });
      if (result.ok) {
          setAppointments(appointments.filter((appointment) => appointment.id != id));
      }
  }

  async function completeAppointment(id) {
      const data = { is_complete: "True" }
      const url = `http://localhost:8080/api/appointments/`;
      const fetchConfig = {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          },
      };
      const result = await fetch(url, fetchConfig);
      if (result.ok) {
          setAppointments(appointments.filter((appointment) => appointment.id != id));
      }

  }

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
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason for visit</th>
                        <th>VIP</th>
                        <th>Status</th>
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
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.vip}</td>
                                <td>{appointment.status}
                                  <button className="btn btn-danger" onClick={() => deleteAppointment(appointment.id)} type="button">Cancel</button>
                                  <button className="btn btn-success" onClick={() => completeAppointment(appointment.id)} type="button">Finished</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
