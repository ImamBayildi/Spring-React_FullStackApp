import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useState } from 'react';
import {UserContext} from '../context/Context.js';
import { useNavigate } from 'react-router-dom';
import { Mail } from '@material-ui/icons';
import GetSnackBar from './smallComponents/SnackBar.js';

export default function Login() {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    email: "error",
    password: 'error',
  })
  const { contextUser, logIn } = useContext(UserContext);
  
  const handleSubmit = (event) => {
    fetch('/auth/login', {//AuthRequest is Object
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify([user.email,user.password])
    })
    .then(res => {//res={user:{k:v}, token:""}
      if (res.ok) {
        
        return res.json();}
        getSnackBar('Giriş basarısız', 'error');
      throw new Error('Network response was not ok.');
    })
    .then(res => {
      logIn(res)
      navigate('/');
    })
    .then(console.log(contextUser.user))
    .catch(err => console.log(err.message));
  };

  //<<<<<SnackBar Handler>>>>
  const [open, setOpen] = useState(false);
  const [snackBarmessage, setMessage] = useState("");
  const [snackBarSeverity, setSeverity] = useState("error");
  const handleCloseSnackBar = () => {
    setOpen(false);
  }
  function getSnackBar(message,severity){ 
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }

  return (
    <>
      <GetSnackBar open={open} message={snackBarmessage} severity={snackBarSeverity} handleClose={() => handleCloseSnackBar()}></GetSnackBar>
      <Container component="main" maxWidth="xs">
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
            Teknisyen Girişi
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adresi"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {(e) => setUser({...user, email: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(e) => setUser({...user, password: e.target.value})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Giriş Yap
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" onClick={() => getSnackBar("Bu seçenek henüz mevcut değil. Sonraki versiyonu bekleyin","info")} variant="body2">
                  Şifreni hatırlamıyor musun?
                  <br/>
                  Sonraki versiyonu bekle!
                </Link>
              </Grid>
              <Grid item>
                <Link href={"/SignUp"} variant="body2">
                  Yeni misin?
                </Link>
              </Grid>
            </Grid>
            <Grid>
            <div style={{fontSize: 16 , paddingTop: 100}}>
            Örnek kullanıcı: AhmetKaya@mail.com
            <br/>
            Master yetkisi: bilgi@ozguryazilim.com.tr
            <br/>
            Tüm şifreler: '0000'
            </div>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}

export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <p><Mail/> ebmayliba@gmail.com</p>
      {'Copyright © '}
      <Link color="inherit" href="https://www.ozguryazilim.com.tr/">
        LabRep
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

