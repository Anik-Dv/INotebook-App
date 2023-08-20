import React, { useContext } from 'react';
import NoteContext from '../Context/note/noteContext';

const NoteItem = (props) => {

  const Context = useContext(NoteContext);
  const { deleteNote } = Context;
  const { note, updateNotes } = props;
  return (
    <div className="col-md-3">
      <div className="card border-warning mb-3">
        <div className="card-header">{note.tag}</div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <span className="my-2">
            <i className="fa-solid fa-pen-to-square mx-3" onClick={() => { updateNotes(note) }}></i>
            <i className="fa-solid fa-trash-can" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Note Successfuly", "success")}}></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
