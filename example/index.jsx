import React from 'react';
import ReactDOM from 'react-dom';

import DaumPostcode from './../lib';

ReactDOM.render(
  <DaumPostcode
    onComplete={data => console.log(data)}
    autoResize
    autoClose
  />
, document.getElementById('root'));
