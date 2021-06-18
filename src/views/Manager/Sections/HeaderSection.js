import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Header from "components/Header/Header.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionNavbars() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div id="navbar" className={classes.navbar}>
        <div className={classes.navigation}>
          <Header
            brand={process.env.REACT_APP_BRAND + " - Área administrativa"}
            href="/manager"
            rightLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="/login-page"
                    className={classes.registerNavLink}
                    color="github"
                    round
                  >
                    SAIR&nbsp;&nbsp;
                    <i
                      className={
                        classes.socialIcons +
                        " " +
                        classes.marginRight5 +
                        " fas fa-sign-out-alt"
                      }
                    />
                  </Button>
                </ListItem>
              </List>
            }
          />
        </div>
      </div>
    </div>
  );
}
