import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Cards from './components/AllPatients/Cards';
import PatientList from './components/AllPatients/PatientList';
import PatientQuery from './components/BasicQuery/PatientQuery';
// import { Routes,Route,Link, NavLink, Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';// "<BrowserRouter/> => index.js"
import { IconButton } from '@mui/material';
import ReportDefine from './components/ReportDefine/ReportDefine';
import AllReports from './components/AllReports/AllReports'
import Master from './components/Master';
import ErrorPage from './components/ErrorPage';
import CssBaseline from '@mui/material/CssBaseline';

import { Box } from '@material-ui/core';
import { UserContext } from './context/Context';
import { useContext, createContext } from 'react';
import Profile from './components/Profile';

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


// import IconButton from '@mui/material/IconButton';
// import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';



function App() {
  const { contextUser,getLocalStorage } = useContext(UserContext);
  const userData = contextUser;
  console.log("App.js userData => ");


 
  return (
    <>
      <CssBaseline/>
      <Navbar/>
      <Routes>
        { (userData.isEnable!=null && userData.isEnable)? (
          <>
            <Route path={"/"} element={<PatientQuery key={90}/>}/> 
            <Route path={"/Rapor_Sorgulama"} element={<PatientQuery key={89}/>}/>
            <Route path={"/Hasta_Listesi"} element={<PatientList key={88}/>}/>
            <Route path={"/Rapor_Tanımlama"} element={<ReportDefine key={87}/>}/>
            <Route path={"/Tüm_Raporlar"} element={<AllReports key={869999}/>}/>
            <Route path="/Profile" element={<Profile  key={85}/>}/>
            <Route path="/MASTER" element={<Master key={84}/>} />
            <Route path="*" element={<ErrorPage key={83}/>} />
          </>
        ) : (
          <>
            <Route path={"/"} element={<PatientQuery key={8}/>}/>
            <Route path="/Rapor_Sorgulama" element={<PatientQuery key={1}/>} />
            <Route path="/Hasta_Listesi" element={<Login key={2}/>} />
            <Route path="/Rapor_Tanımlama" element={<Login  key={3}/>}/>
            <Route path="/Tüm_Raporlar" element={<Login  key={4}/>}/>
            <Route path="/Login" element={<Login  key={5}/>}/>
            <Route path="/Profile" element={<Login  key={6}/>}/>
            <Route path="/SignUp" element={<SignUp  key={6}/>}/>
            <Route path="*" element={<ErrorPage  key={7}/>}/>
            {/* <Navigate to="/error" /> */}
          </>
        )}

        {/*
          my_pages.map((page,index) => (
            <Route path={`/${page}`} element={components[index]}/>
          ))
          */}
      </Routes>


      {/* {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={() => console.log("s")} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}

    
    </>
  );
}

export default App;