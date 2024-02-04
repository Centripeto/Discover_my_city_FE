import { Outlet } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  ListItemButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useThemeMode } from "../providers/ThemeModeProvider";
import { useAuth } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "./menu.component";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DrawerWeb = ({ role }) => {
  return (
    <Drawer
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
      variant="permanent"
      anchor="left"
      open
    >
      <DrawerHeader></DrawerHeader>
      <Divider />
      <Menu role={role}/>
    </Drawer>
  );
};

const DrawerMobile = ({
  theme,
  handleDrawerClose,
  open,
  role,
  children,
}) => {
  return (
    <Drawer
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
      variant="temporary"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Menu role={role} />
      <Divider />
      {children}
    </Drawer>
  );
};

const LogoutDialog = ({ open, handleClose, logout }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleLogout = async () => {
    try {
      await logout();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="logout-dialog"
    >
      <DialogTitle id="logout-dialog-title">Logout</DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          Sei sicuro di voler uscire?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          No
        </Button>
        <Button onClick={handleLogout}>Si</Button>
      </DialogActions>
    </Dialog>
  );
};

const LoginDialog = ({ open, handleClose, login }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, submitCount, isValid },
  } = useForm({
    defaultValues: {},
  });

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const username = register("username", {
    required: "Required",
  });

  const password = register("password", {
    required: "Required",
  });

  const onSubmit = (form) => {
    try {
      login({ username: form.username, password: form.password });
      handleClose();
    } catch (ex) {
      // TODO handle message
      console.log(ex);
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="login-dialog"
    >
      <DialogTitle id="login-dialog">Login</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="username"
                    helperText={
                      errors.username ? errors.username.message : null
                    }
                    variant="outlined"
                    label="Username"
                    error={!!errors.username}
                    name={username.name}
                    onBlur={username.onBlur}
                    onChange={username.onChange}
                    inputRef={username.ref}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    helperText={
                      errors.password ? errors.password.password : null
                    }
                    variant="outlined"
                    label="Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.password}
                    name={password.name}
                    onBlur={password.onBlur}
                    onChange={password.onChange}
                    inputRef={password.ref}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitCount > 0 && !isValid}
            variant="outlined"
            color="primary"
          >
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Layout = () => {
  const theme = useTheme();
  const { toggleColorMode } = useThemeMode();
  const { login, accessToken, logout, user } = useAuth();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const ChangeThemeIcon = () => (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };
  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };
  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log(user);
  const role = user ? user.role : 'UNAUTH';

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" flexGrow={1}>
            Discover My City
          </Typography>
          {user && (
            <Typography variant="h7" component="span" sx={{ mx: 2 }}>
              {user.name} {user.lastname}
            </Typography>
          )}
          {!accessToken ? (
            <IconButton
              color="inherit"
              aria-label="open login"
              onClick={handleLoginDialogOpen}
              edge="start"
              xs={{ mr: 2 }}
            >
              <LoginIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open logout"
              onClick={handleLogoutDialogOpen}
              edge="start"
              xs={{ mr: 2 }}
            >
              <LogoutIcon />
            </IconButton>
          )}
          <ChangeThemeIcon />
        </Toolbar>
      </AppBar>
      <AppBar
        position="fixed"
        open={open}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            xs={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Discover My City
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <DrawerMobile
          open={open}
          handleDrawerClose={handleDrawerClose}
          theme={theme}
          role={role}
        >
          <List>
            {!accessToken ? (
              <ListItem key="login" disablePadding>
                <ListItemButton onClick={handleLoginDialogOpen}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem key="logout" disablePadding>
                <ListItemButton onClick={handleLogoutDialogOpen}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem key="theme" disablePadding>
              <ListItemButton onClick={toggleColorMode}>
                <ListItemIcon>
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </ListItemIcon>
                <ListItemText primary="Theme" />
              </ListItemButton>
            </ListItem>
          </List>
        </DrawerMobile>
        <DrawerWeb role={role} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <DrawerHeader />
        <Outlet />
        {!accessToken && isLoginDialogOpen ? (
          <LoginDialog
            open={isLoginDialogOpen}
            handleClose={handleLoginDialogClose}
            login={login}
          />
        ) : null}
        {isLogoutDialogOpen ? (
          <LogoutDialog
            open={isLogoutDialogOpen}
            handleClose={handleLogoutDialogClose}
            logout={logout}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default Layout;
