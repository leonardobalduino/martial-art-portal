import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
// sections for this page
import SideBarSection from "views/Manager/Sections/SideBarSection.js";
// styles for this page
import sideBarStyles from "assets/jss/material-kit-react/components/sideBarStyle.js";

const useStyles = sideBarStyles;

export default function MainPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token === null || token === undefined || token === "")
      history.push("/login-page");
  }, []);

  const renderContent = () => {
    if (props.content !== undefined) return props.content;
    else return "Dashboard";
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBarSection {...rest} />
      <main className={classes.content}>
        <Toolbar />
        {renderContent()}
      </main>
    </div>
  );
}

MainPage.propTypes = {
  content: PropTypes.node,
};
