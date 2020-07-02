import React, { useState } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

let date = null;
 
const DatePicker = () => {
  const [currentDate, setNewDate] = useState(null);
  const onChange = (event, data) => {setNewDate(data.value);date = data.value}
 
  return <SemanticDatepicker onChange={onChange} />;
};

export {DatePicker};

export function getDate() {
  return date.toJSON().slice(0, 19).replace('T', ' ');
};