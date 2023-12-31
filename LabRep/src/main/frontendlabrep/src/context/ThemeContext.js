import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { cyan, grey, blue, blueGrey, indigo } from '@mui/material/colors';

export const ColorModeContext = React.createContext();
export default function MyThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const getColor = (mode) => ({
    palette: {
      mode,
      primary: {
        ...cyan,
        ...(mode === 'light' ? ({
          main: blue[200],
          secondary: blue[100],
          heavy: blue[900],
          light: blue[100],
          thirty: indigo[600]
        }) : (
          {
            main: blueGrey[700],
            secondary: blueGrey[900],
            heavy: grey[800],
            light: cyan[300],
            thirty: indigo[600]
          }
        )),
      },
      ...(mode === 'dark' ? ({
        background: {
          default: blueGrey[800],
          paper: blueGrey[900],
          light: blueGrey[900],
        },
      }) : (
        {
          background: {
            default: blue[50],
            paper: blue[100],
            light: blue[100],
          },
        }
      )
      ),
      text: {
        ...(mode === 'light'
          ? {
            primary: grey[900],
            secondary: grey[800],
          }
          : {
            primary: '#fff',
            secondary: grey[300],
          }),
      },
    },
  });

  const [mode, setMode] = React.useState(prefersDarkMode ? 'light' : 'dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const modeTheme = createTheme(getColor(mode));
  return (
    <ColorModeContext.Provider value={{modeTheme, toggleColorMode:colorMode.toggleColorMode}}>
      <ThemeProvider theme={modeTheme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}