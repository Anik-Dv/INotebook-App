import React, { useContext, useState } from 'react';
//import notecontext
import NoteContext from '../Context/note/noteContext';

const AddNote = (props)=> {
  // import NoteContext/ usecontext
  const Context = useContext(NoteContext);
    const {addNote} = Context;

  const [note, setNote] = useState({title:"", description: "", tag:""});
  
  //submit button input client side submit function
  const handleClick =(e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag) ;
    setNote({title: "", description:  "", tag: ""})
    props.showAlert("created Note Successfuly", "success")
  }
  //placeHolder input client side change function
  const onChange = (e)=>{
    setNote({ ...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div className='container my-4'>
        <h1>Create a New Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required value={note.title}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" onChange={onChange} value={note.tag}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={3} required value={note.description}/>
          </div>
          <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary" onClick={handleClick} >Add Notes</button>
        </form>
        <hr/>
      </div>
    </>
  );
}

export default AddNote;
