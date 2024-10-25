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
import FinanceIcon from '@mui/icons-material/AttachMoney';
import ReportIcon from '@mui/icons-material/Assessment';
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AttendanceIcon from '@mui/icons-material/EventAvailable';
import EventIcon from '@mui/icons-material/Event';

const SideBar = ({ isSidebarExpanded }) => {
  const location = useLocation();

  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/">
          <Tooltip title="Home" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {/* Conditionally render ListItemText based on sidebar expansion */}
          {isSidebarExpanded && <ListItemText primary="Home" />}
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/event-overview">
          <Tooltip title="Event" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <EventIcon color={location.pathname.startsWith('/Admin/event-overview') ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {isSidebarExpanded && <ListItemText primary="Event" />}
        </ListItemButton>

            
        {/* Attendance */}
        <ListItemButton component={Link} to="/Admin/attendance">
          <Tooltip title="Attendance" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <AttendanceIcon color={location.pathname.startsWith('/Admin/attendance') ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {isSidebarExpanded && <ListItemText primary="Attendance" />}
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/frontdesk">
          <Tooltip title="Frontdesk" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <PersonOutlineIcon color={location.pathname.startsWith('/Admin/frontdesk') ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {isSidebarExpanded && <ListItemText primary="Frontdesk" />}
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/finance">
          <Tooltip title="Finance" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <FinanceIcon color={location.pathname.startsWith('/Admin/finance') ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {isSidebarExpanded && <ListItemText primary="Finance" />}
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/report">
          <Tooltip title="Report" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <ReportIcon color={location.pathname.startsWith('/Admin/report') ? 'primary' : 'inherit'} />
            </ListItemIcon>
          </Tooltip>
          {isSidebarExpanded && <ListItemText primary="Report" />}
        </ListItemButton>
      </React.Fragment>

      <Divider sx={{ my: 1 }} />

      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>

        <ListItemButton component={Link} to="/Admin/profile">
          <Tooltip title="Profile" placement="right" arrow disableHoverListener={isSidebarExpanded}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
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
