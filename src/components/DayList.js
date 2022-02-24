import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const parsedDays = props.days.map(day => 
  <DayListItem 
    selected={day.name === props.value} 
    key={day.id} 
    setDay={props.onChange} 
    {...day}/>);
  return (
    <ul>
      {parsedDays}
    </ul>
  );
}
