import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ScienceTwoToneIcon from '@mui/icons-material/ScienceTwoTone';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LightModeIcon from '@mui/icons-material/LightMode';
import Grid from "@mui/material/Grid";

import { UserContext } from "../context/Context";
import { ColorModeContext } from "../context/ThemeContext";

export default function Navbar() {
  const my_pages = ['Rapor_Sorgulama', 'Hasta_Listesi', 'Rapor_Tanımlama', 'Tüm_Raporlar'];

  const { contextUser, logOut } = useContext(UserContext);

  const my_settings = ['Profile', 'Çıkış'];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenSettingsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseSettingsMenu = (param) => {
    setAnchorElUser(null);
  };

  function menuHandler(param) {

    if (param === my_settings[0]) navigate("/Profile")
    else if (param === my_settings[1]) {
      console.log("LOGGED OUT")
      logOut();
    }
  }

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <ScienceTwoToneIcon></ScienceTwoToneIcon>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  fontWeight: "200",
                  fontFamily: 'roboto',
                  color: 'white',
                  letterSpacing: '.2rem',
                  textDecoration: 'none',
                }}
              >
                LABREPORT
              </Typography>
              <Grid style={{ flexWrap: 'wrap', flexGrow: 1, display: 'flex' }}>
                {my_pages.map((page, index) => (
                  <Button
                    key={index}
                    style={{ color: theme.palette.text.primary, display: 'block', paddingRight: '30px' }}
                    component={Link}
                    to={`/${page}`}
                  >
                    {page.split('_').join(' ')}
                  </Button>
                ))}
              </Grid>
            </Grid>

            <Grid style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Box style={{ flexWrap: 'wrap', flexGrow: 1, display: 'flex' }}>
                {
                  (contextUser.authorities[0] === "ROLE_MASTER") ? (
                    <>
                      <Button
                        style={{ color: 'tomato', display: 'block', paddingRight: '20px' }}
                        href={`/MASTER`}
                      >
                        MASTER
                      </Button>
                    </>
                  ) : (null)
                }
                {
                  (contextUser.isEnable != null && contextUser.isEnable) ? (null) : (
                    <>
                      <Button
                        style={{ color: 'whitesmoke', display: 'block', paddingRight: '15px' }}
                        href={`/login`}
                      >
                        Login
                      </Button>
                      <Button
                        style={{ color: 'whitesmoke', display: 'block', paddingRight: '15px' }}
                        href={`/SignUp`}
                      >
                        SignUp
                      </Button>
                    </>
                  )
                }
              </Box>
              <Grid>
                {theme.palette.mode} mode
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <NightlightRoundIcon /> : <LightModeIcon />}
                </IconButton>
              </Grid>
              <Box>
                {false}
                <Tooltip title="kullanıcı ayarları">
                  <IconButton onClick={handleOpenSettingsMenu} style={{ padding: "0px" }}>
                    <Avatar style={{ background: theme.palette.primary.thirty, color: "white" }} aria-label="recipe">
                      {contextUser.isEnable ? contextUser.fullName[0] : "P"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu id="menu-appbar" anchorEl={anchorElUser}
                  style={{ display: 'flex', flexWrap: 'wrap', marginTop: '55px', flexDirection: 'column' }}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseSettingsMenu}
                >
                  {my_settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => { handleCloseSettingsMenu(); menuHandler(setting); }}>
                      <Typography style={{ color: theme.palette.text.primary.main }} textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}