import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/Context';
import { Copyright } from './Login';
import GetSnackBar from './smallComponents/SnackBar';
import { useState } from 'react';


// TODO remove, this demo shouldn't need to reset the theme.
      


export default function SignUp() {
  const [isCreated,setIsCreated] = React.useState(false);
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    authorities : ["ROLE_TECH"]
});
  const { logIn, contextUser } = useContext(UserContext);

  const emailRegexp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
    console.log({
      ...data,
      fullName: data.firstName +" "+ data.lastName,
      [e.target.name] : e.target.value
    });
  };

  async function handleSignUp() {
    if (emailRegexp.test(data.email) && data.firstName && data.lastName && data.password) {

      await fetch('/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify({
          ...data,
          fullName: data.firstName +" "+ data.lastName,
        })
      })
      .then(res => {
        if (res.ok) {
        getSnackBar("Üyelik oluşturuldu.", "success");
        setIsCreated(!isCreated);
         return res.json();
        }
        getSnackBar('Üyelik basarısız.', 'error');
        return null;
      })
      .catch(err =>alert(err.message));

    } else {
      getSnackBar('Bilgilerinizi kontrol edin.', 'error');
    }

    
  }

//<<<<<SnackBar Handler>>>>
const [open, setOpen] = useState(false);
const [snackBarmessage, setMessage] = useState("");
const [snackBarSeverity, setSeverity] = useState("error");
const handleCloseSnackBar = () => {
    setOpen(false);
}
function getSnackBar(message, severity) {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
}
  return (
    <>
      { isCreated? (<Navigate to="/login" />) : (null) }
        {/* <ThemeProvider theme={defaultTheme} sx={{ backgroundColor: 'black' }}></ThemeProvider> */}
        <GetSnackBar open={open} message={snackBarmessage} severity={snackBarSeverity} handleClose={handleCloseSnackBar}></GetSnackBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hesap Oluştur
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Ad"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Soyad"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Adresi"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Promosyonlar ve haber bülteninizden haberdar olmak istiyorum."
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignUp}
            >
              Hesap Oluştur
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Zaten hesabın var mı? Giriş Yap
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}

