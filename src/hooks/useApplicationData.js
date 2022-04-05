import axios from 'axios';
import { useEffect, useReducer } from 'react';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {

  function reducer(state, action) {
    switch(action.type) {
      case SET_DAY:
        return {...state, day: action.day}
      case SET_APPLICATION_DATA:
        return {
          ...state, 
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      case SET_INTERVIEW:
        return {
          ...state,
          appointments: {
            ...state.appointments,
            [action.id]: {
              ...state.appointments[action.id],
              interview: action.interview
            }
          }
          // state[appoinments][action.id][interview]: action.interview,
        } 
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        )
    }
  }
  // const [state, setState] = useState({
    //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });
  const [state, dispatch] = useReducer(reducer, 
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    }
  );

  const setDay = (day) => dispatch({type: SET_DAY, day});
 
  const spotCounter = (action) => {
    const copyOfDays = [...state.days]
    //action determines how to change spots
    const modifier = action === "book" ? -1 : 1;
    for (const day in copyOfDays) {
      if (copyOfDays[day].name === state.day) {
        copyOfDays[day].spots += modifier;
      }
    }
    return copyOfDays;
  }

  function bookInterview(id, interview) {
    //if already an interview, don't update spot (i.e when editing) 
    if (!state.appointments[id].interview) {
      spotCounter("book");
    }

    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview
      }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(response => {
        dispatch({type: SET_INTERVIEW, id, interview})
        // setState({
        //   ...state,
        //   appointments
        // });
      })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //reduce spot count by 1
    spotCounter("cancel")

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({type: SET_INTERVIEW, id, interview: null})
      })
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({type: SET_APPLICATION_DATA, 
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};