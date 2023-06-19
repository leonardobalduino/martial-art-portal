import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import stylesTeam from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);
const useStylesTeam = makeStyles(stylesTeam);

export default function WhereToTrainSection() {
  const classes = useStyles();
  const classesTeam = useStylesTeam();

  return (
    <div className={classesTeam.section} id="whereToTrain">
      <h2 className={classesTeam.title}>Onde treinar</h2>
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
                tabs={[
                  {
                    tabButton: "MG",
                    tabIcon: LocationOn,
                    tabContent: (
                      <span>
                        <p>Unaí.</p>
                        <br />
                        <p>Av. Formosa.</p>
                        <br />
                        <p>Centro.</p>
                      </span>
                    ),
                  },
                  {
                    tabButton: "DF",
                    tabIcon: LocationOn,
                    tabContent: (
                      <span>
                        <p>Em breve...</p>
                      </span>
                    ),
                  },
                  {
                    tabButton: "Japão",
                    tabIcon: LocationOn,
                    tabContent: (
                      <span>
                        <p>Em breve...</p>
                      </span>
                    ),
                  },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
