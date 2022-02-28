import React from 'react';
import 'components/Appointment/styles.scss';
import Header from '../Appointment/header';
import Show from './show';
import Empty from './empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING"
  const {mode , transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
    .catch(err => console.log("error:", err))
  }

  function deleteInterview(id) {

    transition(DELETING);
    props.cancelInterview(id)
    .then(() => {
      transition(EMPTY);
    })
  }

 
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === CONFIRMING && <Confirm 
        onCancel={back}
        onConfirm={() => deleteInterview(props.id)}
        message="Are you sure you would like to Delete?"
        />}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} 
          onDelete={() => transition(CONFIRMING)}
          appointmentId={props.id}
        />)}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
        />)}
    </article>
  );
}
