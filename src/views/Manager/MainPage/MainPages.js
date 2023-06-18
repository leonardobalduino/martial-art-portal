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
  const renew_token_seconds = Number(process.env.REACT_APP_RENEW_TOKEN_SECONDS);
  const api = process.env.REACT_APP_API_URL;

  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token === null || token === undefined || token === "")
      history.push("/login-page");
  }, []);

  async function rewewToken() {
    let lastDate = localStorage.getItem("lastDate");

    if (lastDate === null || lastDate === undefined) {
      localStorage.setItem("lastDate", new Date());
    } else {
      const diff = new Date() - new Date(lastDate);
      const seconds = diff / 1000;

      if (seconds > renew_token_seconds) {
        localStorage.setItem("lastDate", new Date());

        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        const res = await fetch(`${api}/v1/auth/renew`, requestOptions);
        const data = await res.json();

        if (!res.ok) {
          history.push("/login-page");
          return;
        }

        localStorage.setItem("token", data.access_token);
      }
    }
  }

  const renderContent = () => {
    rewewToken();
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
