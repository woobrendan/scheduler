import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './header';
import Show from './show';
import Empty from './empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
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
    .catch(err => transition(ERROR_SAVE, true))
  }

  function deleteInterview(id) {

    transition(DELETING, true);
    props.cancelInterview(id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(err => {
      transition(ERROR_DELETE, true)
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
          onEdit={() => transition(EDIT)}
        />)}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
        />)}
      {mode === EDIT && 
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={back}
          onSave={save}
          interviewers={props.interviewers} 
        />}
      {mode === ERROR_DELETE && 
      <Error 
        onClose={back}
        message="Could not cancel appointment"
      />}
      {mode === ERROR_SAVE && <Error onClose={back}/>}
    </article>
  );
}
