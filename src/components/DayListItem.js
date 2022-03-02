import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  const formatSpots = () => {
    let result = ""
    if (props.spots === 0) {
      result += "no spots remaining"
    } else if (props.spots === 1) {
      result += `${props.spots} spot remaining`
    } else {
      result += `${props.spots} spots remaining`
    }
    return result;
  }
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
