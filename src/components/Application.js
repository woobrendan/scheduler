import React, { useState, useEffect } from "react";
import Appointment from 'components/Appointment/index'
import axios from 'axios';
import "components/Application.scss";
import DayList from '../components/DayList';


export default function Application(props) {
  const [state, setState] = useState({
    day: "monday",
    days: [],
    appointments: {}
  })

  const setDay = (day) => setState({...state, day});
  const setDays = (days) => setState(prev => ({...prev, days}));

  useEffect(() => {
    axios.get('/api/days').then(response => setDays(response.data))
  },[])

  const parsedAppointments = appointments.map(appointment => 
    <Appointment
      key={appointment.id} 
      {...appointment}
      />
  );
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"/>
      <hr className="sidebar__separator sidebar--centered"/>
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
