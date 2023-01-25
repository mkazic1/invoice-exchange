import React from 'react';
import {
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import MENU_OPTIONS from '../constants-data/menu';
import {
  menuOptionsStyle,
  menuIconsStyle,
  menuButtonsStyle,
} from '../styles/components/MenuBarStyle';
import { linkStyle } from '../styles/CommonStyle';

export default function MenuBar() {
  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: 'primary.main',
          width: '200px',
          zIndex: 0,
        },
      }}
      variant="permanent"
      open
      anchor="left"
    >
      <Box sx={menuOptionsStyle}>
        {
          MENU_OPTIONS.map((option) => (
            <ListItem key={option.title} disablePadding>
              <NavLink
                to={option.navigation}
                style={linkStyle}
              >
                <ListItemButton sx={menuButtonsStyle}>
                  <ListItemIcon sx={menuIconsStyle}>{option.icon}</ListItemIcon>
                  <ListItemText>{option.title}</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))
      }
      </Box>
    </Drawer>
  );
}
