import React from 'react';
import '../assets/Submit.css';

function Submit(props) {
  return (
    <button className='SubmitButton' onClick={props.handleSubmit}>
      Submit
    </button>
  );
}

export default Submit;
