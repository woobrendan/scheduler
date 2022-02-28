import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const copyHistory = [...history]
    setMode(newMode);
   
    if (replace) {
      copyHistory.pop();
      copyHistory.push(newMode);
    } else {
      copyHistory.push(newMode);
    }
    setHistory(copyHistory);
  }
  const back = () => {
    const copyHistory = [...history]
    if (history.length === 1) {
      return;
    }
    copyHistory.pop();
    setMode(copyHistory[copyHistory.length - 1]);
    setHistory(copyHistory);
  }

  return {
    mode,
    transition,
    back
  }
}