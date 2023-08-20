import React, { useContext, useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/note/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Note = (props) => {
  let navigate = useNavigate();
  const Context = useContext(NoteContext);
  const { notes, getNotes, EditNote } = Context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});
  
  const updateNotes = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id , etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    

  }
  //Edit Notes submited This button
  const handleClick =(e)=>{
    console.log("Updating Note....", note);
    EditNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Note Successfuly", "success")
  }
  
  //placeHolder input/Notes changeing client side function.
  const onChange = (e)=>{
    setNote({ ...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New message</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="col-form-label">Title:</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="col-form-label">Tag:</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="col-form-label">Description:</label>
                  <textarea className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
              <button ref={ref} type="button" className="btn btn-primary" onClick={handleClick}>Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <button ref={refClose} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Close Notes</button>

      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.length === 0 && "You Not Have Any Notes Here!"}
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNotes={updateNotes} note={note} showAlert={props.showAlert} />
        })}
      </div>

    </>
  );
}

export default Note;
