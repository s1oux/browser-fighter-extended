import React from 'react';

import { unsetLoginSession } from '../../services/authService';

export default function SignOut({ isSignedIn, onSignOut }) {
  const signOut = () => {
    unsetLoginSession();
    onSignOut();
  };

  if (isSignedIn) {
    return <div onClick={signOut}>Sign out</div>;
  }

  return null;
}
