export function getAppointmentsForDay(state, day) {
  const todayArray = state.days.filter(dayFromArray => dayFromArray.name === day);

  if (todayArray.length === 0) {
    return [];
  }
  const interviewerArray = todayArray[0].appointments
  const result = [];
  for (const interviewerId of interviewerArray) {
    if (interviewerId === state.appointments[interviewerId].id) {
      result.push(state.appointments[interviewerId])
    }
  }
  return result;
}

export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }
  const result = {};
  const interviewNum = interview.interviewer;
  //match the interviewer num with the interviewer id
  if (state.interviewers[interviewNum].id === interview.interviewer) {
    result.student = interview.student;
    result.interviewer = state.interviewers[interviewNum]
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  const todayArray = state.days.filter(dayFromArray => dayFromArray.name === day);

  if (todayArray.length === 0) {
    return [];
  }
  const interviewerArray = todayArray[0].interviewers;
  const result = [];
  for (const interviewerId of interviewerArray) {
    if (interviewerId === state.interviewers[interviewerId].id) {
      result.push(state.interviewers[interviewerId])
    }
  }
  return result;
}