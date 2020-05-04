// in future might want to chnage this to another claendar in github
// https://github.com/mdehoog/Semantic-UI-Calendar

import React, { useState } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
 
const AppWithBasic = () => {
  const [currentDate, setNewDate] = useState(null);
  const onChange = (event, data) => setNewDate(data.value);
 
  return <SemanticDatepicker onChange={onChange} />;
};
 
const AppWithRangeAndInPortuguese = () => {
  const [currentRange, setNewRange] = useState([]);
  const onChange = (event, data) => setNewRange(data.value);
 
  return <SemanticDatepicker locale="pt-BR" onChange={onChange} type="range" />;
};

export default AppWithRangeAndInPortuguese;