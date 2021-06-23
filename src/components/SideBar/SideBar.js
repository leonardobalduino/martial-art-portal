import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import sideBarStyles from "assets/jss/material-kit-react/components/sideBarStyle.js";

const useStyles = sideBarStyles;

export default function SideBar(props) {
  const { brand, menuLinks } = props;
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" noWrap>
            {brand !== undefined ? brand : "Dashboard"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>{menuLinks}</div>
      </Drawer>
    </div>
  );
}

SideBar.propTypes = {
  brand: PropTypes.string,
  menuLinks: PropTypes.node,
};
