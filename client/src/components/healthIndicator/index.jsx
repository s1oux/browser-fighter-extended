import React from 'react';

// convert to react component
export default function HealthIndicator({ fighter, position }) {
  const { name } = fighter;
  const id = `${position}-fighter-indicator`;

  return (
    <div className="arena___fighter-indicator">
      <span className="arena___fighter-name">{name}</span>
      <div className="arena___health-indicator">
        <div id={id} className="arena___health-bar"></div>
      </div>
    </div>
  );
}
