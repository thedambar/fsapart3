import React from 'react';

const Notice = ({notice}) => {
  if (notice) {
    return (
      <div className="notice">{notice}</div>
    )
  }
}

export default Notice;