import { FunctionComponent, useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";

import { Menu as MenuIcon, Adb as AdbIcon } from "@mui/icons-material";

import { GlobalProps } from "../App";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";

interface NavBarProps {}
const pages = ["About", "Fav Cards", "My Cards", "Sandbox"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar: FunctionComponent<NavBarProps> = () => {
  const { isUserLogedin, currentUser, isDarkMode,setIsDarkMode } = useContext(GlobalProps);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // const [auth, setAuth] = useState(false);

  console.log(currentUser?.isAdmin, currentUser?.isBusiness);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SettingsSystemDaydreamIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NexCRM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{  flexGrow: 1, display: 'flex',marginLeft: "auto", paddingRight: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDarkMode}
                    onChange={() => {
                      console.log("dark");
                      setIsDarkMode(!isDarkMode)


                      
                    }}
                    aria-label="login switch"
                    sx={{
                      // Custom styles when the switch is checked
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: 'white',  // Thumb color when checked
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'white',  // Track color when checked
                      },
                      // Custom styles when the switch is not checked
                      '& .MuiSwitch-switchBase': {
                        color: 'white',  // Thumb color when not checked
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: '#e0e0e0', // Grey track color when not checked
                      },
                    }}
                  />
                }
                label={isDarkMode ? "Dark" : "No dark"}
                // label={"dark"}
              />
            </FormGroup>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <>
          {/* <h4> {isUserLogedin && "logdin"}</h4>
          <br />
          <h4> {token}</h4>
          
          <br />
          <h4> {currentUser && currentUser.name.first} </h4>
          <h4> {!isDarkMode && "not dark"}</h4> */}
        </>
      </Container>
    </AppBar>
  );
};

export default NavBar;
