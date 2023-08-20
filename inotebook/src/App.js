import React, { useState } from "react";
import './App.css';
import Navber from './Componente/Navber';
import Home from './Componente/Home';
import About from './Componente/About';
import NoteState from './Context/note/NoteState';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Componente/Login';
import SignUp from './Componente/SignUp';
import Alert from './Componente/Alert';

const App = () => {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };


  return (
    <>
      <NoteState>
        <Router>
          <Navber />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/about" element={<About showAlert={showAlert} />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
