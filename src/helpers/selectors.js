

export function getAppointmentsForDay(state, day) {
  const todayArray = state.days.filter(dayFromArray => dayFromArray.name === day);

  if (todayArray.length === 0) {
    return [];
  }
  const aptArray = todayArray[0].appointments
  const result = [];
  for (const aptId of aptArray) {
    if (aptId === state.appointments[aptId].id) {
      result.push(state.appointments[aptId])
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