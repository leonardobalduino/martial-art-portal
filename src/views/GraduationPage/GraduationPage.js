import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import stylesTeam from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

// @material-ui/icons
import GestureIcon from "@material-ui/icons/Gesture";

const useStyles = makeStyles(styles);
const useStylesTeam = makeStyles(stylesTeam);

export default function GraduationPage(props) {
  const [graduations, setGraduations] = useState([]);
  useEffect(() => {
    getGraduations();
  }, []);

  const api = process.env.REACT_APP_API_URL;

  async function getGraduations() {
    try {
      const res = await fetch(`${api}/v1/graduations`);
      const data = await res.json();

      var tabs = data.map(function (graduation) {
        const styleTitle = {
          color: `${graduation.order > 9 ? "white" : "black"}`,
          backgroundColor: `${graduation.color}`,
        };

        return {
          color: "success",
          tabButton: (
            <span onClick={() => window.scrollTo({ top: 250 })}>
              {graduation.name}
            </span>
          ),
          tabIcon: GestureIcon,
          tabContent: (
            <span id={graduation.id}>
              <h3
                style={styleTitle}
                className={(classes.center, classes.titleBorderRadius)}
              >
                {graduation.name.toUpperCase()}
              </h3>
              <p className={classes.justifyCenter}>{graduation.description}</p>
            </span>
          ),
        };
      });
      setGraduations(tabs);
    } catch (err) {
      console.error(err);
    }
  }

  const classes = useStyles();
  const classesTeam = useStylesTeam();

  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        small
        filter
        image={require("assets/img/profile-bg.jpg").default}
      />
      <div
        id="graduations"
        className={classNames(classes.main, classes.mainRaised)}
      >
        <div className={classesTeam.section}>
          <h2 className={classesTeam.title}>Graduações</h2>
          <div className={classes.container}>
            <div id="navigation-pills">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <NavPills
                    color="primary"
                    horizontal={{
                      tabsGrid: { xs: 12, sm: 2, md: 2 },
                      contentGrid: { xs: 12, sm: 10, md: 10 },
                    }}
                    tabs={graduations}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
