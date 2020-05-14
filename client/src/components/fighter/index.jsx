import React from 'react';

import './fighter.css';

export default function Fighter({ fighter, position }) {
  const positionClassName =
    position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const classes = `arena___fighter ${positionClassName}`;

  return (
    <div className={classes}>
      <img
        className="fighter-preview___img"
        src={fighter.img}
        alt={fighter.name}
      />
    </div>
  );
}
