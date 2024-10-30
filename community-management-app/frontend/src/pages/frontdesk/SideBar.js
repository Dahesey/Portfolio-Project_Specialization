import * as React from "react";

import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AttendanceIcon from '@mui/icons-material/EventAvailable';

const SideBar = ({ isSidebarExpanded }) => {
  const location = useLocation();

  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/">
          <Tooltip title="Home" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <HomeIcon color={location.pathname === ("/" || "/FrontDesk/dashboard") ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {/* Conditionally render ListItemText based on sidebar expansion */}
          {isSidebarExpanded && <ListItemText primary="Home" />}
        </ListItemButton>

            
        {/* Membership */}
        <ListItemButton component={Link} to="/FrontDesk/Membership">
          <Tooltip title="Membership" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <AttendanceIcon color={location.pathname.startsWith('/FrontDesk/Membership') ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {isSidebarExpanded && <ListItemText primary="Membership" />}
        </ListItemButton>

        {/* Check-in */}
        <ListItemButton component={Link} to="/FrontDesk/Checkin">
          <Tooltip title="Check-in" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <PersonOutlineIcon color={location.pathname.startsWith('/FrontDesk/Checkin') ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {isSidebarExpanded && <ListItemText primary="Check-in" />}
        </ListItemButton>

      </React.Fragment>

      <Divider sx={{ my: 1 }} />

      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>

        <ListItemButton component={Link} to="/Frontdesk/profile">
          <Tooltip title="Profile" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Frontdesk/profile") ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {isSidebarExpanded && <ListItemText primary="Profile" />}
        </ListItemButton>




        <ListItemButton component={Link} to="/logout">
          <Tooltip title="Logout" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {isSidebarExpanded && <ListItemText primary="Logout" />}
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;

