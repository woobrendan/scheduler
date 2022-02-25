import React, { useState, useEffect } from "react";
import Appointment from 'components/Appointment/index'
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import axios from 'axios';
import "components/Application.scss";
import DayList from '../components/DayList';


export default function Application(props) {
  const [state, setState] = useState({
    day: "monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({...state, day});
  // const setDays = (days) => setState(prev => ({...prev, days}));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // const [daysArray, appointmentsArray] = all;
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  },[])

  const parsedAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
    <Appointment
      key={appointment.id}
      interview={interview} 
      {...appointment}
      />);
  });
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
