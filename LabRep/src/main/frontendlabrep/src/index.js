import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/Context';
import MyThemeProvider from './context/ThemeContext';


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <MyThemeProvider>
        <BrowserRouter>
        
          <App />

        </BrowserRouter>
      </MyThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);





