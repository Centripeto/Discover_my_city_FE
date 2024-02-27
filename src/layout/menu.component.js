import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ExpandLess, ExpandMore, AdminPanelSettings, PersonAdd, LocationCity } from "@mui/icons-material";

const HOME = {
  label: "Home",
  path: "/",
  icon: <HomeIcon />,
};

const CREATE_POI = {
  label: "Crea",
  path: "/poi/create",
  icon: <AddIcon />,
};

const LIST_POI = {
  label: "Lista",
  path: "/poi",
  icon: <ListIcon />,
};

const APPROVE_POI = {
  label: "Approva",
  path: "/poi/approve",
  icon: <DoneAllIcon />,
};

const CREATE_USER = {
  label: "Crea Utente",
  path: "/user/create",
  icon: <PersonAdd />,
};

const CREATE_MUNICIPALITY = {
  label: "Crea Municipio",
  path: "/municipality/create",
  icon: <LocationCity />,
};

const noAuthMenu = [
  HOME,
  {
    label: "Punti di interesse",
    collapse: true,
    icon: <PlaceIcon />,
    subMenu: [LIST_POI],
  },
];

const contributorMenu = [
  HOME,
  {
    label: "Punti di interesse",
    collapse: true,
    icon: <PlaceIcon />,
    subMenu: [CREATE_POI, LIST_POI],
  },
];

const authContributorMenu = [
  HOME,
  {
    label: "Punti di interesse",
    collapse: true,
    icon: <PlaceIcon />,
    subMenu: [CREATE_POI, LIST_POI],
  },
];

const curatoreMenu = [
  HOME,
  {
    label: "Punti di interesse",
    collapse: true,
    icon: <PlaceIcon />,
    subMenu: [CREATE_POI, LIST_POI, APPROVE_POI],
  },
];

const adminMenu = [
  HOME,
  {
    label: "Punti di interesse",
    collapse: true,
    icon: <PlaceIcon />,
    subMenu: [LIST_POI],
  },
  {
    label: "Amministrazione",
    collapse: true,
    icon: <AdminPanelSettings />,
    subMenu: [CREATE_USER, CREATE_MUNICIPALITY],
  },
];

const getMenu = (role) => {
  switch (role) {
    case "ADMIN":
      return adminMenu;
    case "CURATORE":
      return curatoreMenu;
    case "CONTRIBUTOR":
      return contributorMenu;
    case "AUTH_CONTRIBUTOR":
      return authContributorMenu;
    default:
      return noAuthMenu;
  }
};

const Item = ({ item, sx }) => (
  <ListItem key={item.label} disablePadding>
    <ListItemButton LinkComponent={Link} to={item.path} sx={sx}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItemButton>
  </ListItem>
);

const CollapseItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <ListItem key={item.label} disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.subMenu.map((el) => (
            <Item key={item.label + el.label} item={el} inner sx={{ pl: 4 }} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

const Menu = ({ role }) => {
  const menu = getMenu(role);
  return (
    <List>
      {menu.map((item) =>
        item.collapse ? (
          <CollapseItem key={item.label} item={item} />
        ) : (
          <Item key={item.label} item={item} />
        )
      )}
    </List>
  );
};

export default Menu;
