import React from 'react';

export default (props) => {
  return (
    <div
      className={`generic-pass-wrapper ${props.className ? props.className : ''}`}
      id={props.id}
    >
      { props.children }
    </div>
  );
}

