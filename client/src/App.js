import React from 'react';
import StartScreen from './components/startScreen';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StartScreen />
    </MuiThemeProvider>
  );
}

export default App;
