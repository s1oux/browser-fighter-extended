import React from 'react';

import './linkButton.css';

export default function LinkButton(props) {
  const classes = `btn-link ${props.side}`;
  return <div className={classes}>{props.children}</div>;
}
