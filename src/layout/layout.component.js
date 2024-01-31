import { Link, Outlet } from "react-router-dom";
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
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
import LoginIcon from '@mui/icons-material/Login';

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

const DrawerWeb = ({ sideMenu }) => {
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
      <List>
        {sideMenu.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton LinkComponent={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

const DrawerMobile = ({
  theme,
  handleDrawerClose,
  open,
  sideMenu,
  additionalMenu,
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
      <List>
        {sideMenu.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton LinkComponent={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {additionalMenu?.map((item) => (
          <ListItem key={item.label} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
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
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
        </form>
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
    </Dialog>
  );
};

const sideMenu = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Punti di interesse",
    path: "/poi",
    icon: <PlaceIcon />,
  },
];

const Layout = () => {
  const theme = useTheme();
  const { toggleColorMode } = useThemeMode();
  const { login, accessToken } = useAuth();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          ) : null}
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
          sideMenu={sideMenu}
        />
        <DrawerWeb sideMenu={sideMenu} />
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
        {!accessToken ? (
          <LoginDialog
            open={isLoginDialogOpen}
            handleClose={handleLoginDialogClose}
            login={login}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default Layout;
