import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Fetch All Notes Client Side
  const getNotes = async () => {
    //Call To API
    const response = await fetch(`${Host}api/notes/fetchallnotes`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(json);
    console.log(json);
  };

  //CREATED A FUNCTION (ADD A NOTE/CREATE A NOTE).
  //create Note
  const addNote = async (title, description, tag) => {
    //API CALL FETCH ADD NEW NOTES CLINT SIDE
    const response = await fetch(`${Host}api/notes/addnotes`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects
    console.log(note);

    // console.log("Run addnotes method");
    //USER CREATE A NOTE WITH THIS METHOD - TITLE, DESC AND TAG .\
    // const note = {
    //   "_id": "62f3ab79fc6fb8fa695d05154",
    //   "user": "62ecf77e964d8b9a7e40a9a0",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-08-10T12:58:33.025Z",
    //   "__v": 0
    // }
    setNotes(notes.concat(note));
  };

  //CREATED A FUNCTION DELETE A NOTE WITH USER ID.
  //Delete Note
  const deleteNote = async (id) => {
    //API CALL Delete Notes
    const response = await fetch(`${Host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    //logic of delete notes
    console.log("Deleting Note With id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  const Host = "http://localhost:5000/";

  //CREATED A FUNCTION EDIT A NOTE.
  //Edit Note Funcition
  const EditNote = async (id, title, description, tag) => {
    //API CALL fetch update Notes
    const response = await fetch(`${Host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    // console.log(json);
    setNotes(json)

    //Updating the Note in the Frontend
    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic of edit method
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(id, notes);
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
    value={{ notes, addNote, deleteNote, EditNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
