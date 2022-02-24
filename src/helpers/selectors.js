

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