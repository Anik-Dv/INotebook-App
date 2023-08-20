import React from 'react';
import Note from './Note';

function Home(props) {
  const {showAlert} = props;
  return (
    <>
      
      <Note showAlert={showAlert}/>
    </>
  );
}

export default Home;
