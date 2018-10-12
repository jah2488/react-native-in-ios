import React from 'react';

const Friend = ({ name, response, onClick }) => (
  <p className={`friend ${response}`} onClick={onClick ? onClick(name) : null}>
    {name}
  </p>
);

export default Friend;
