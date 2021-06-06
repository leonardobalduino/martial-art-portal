import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import ninja from "assets/img/faces/ninja.png";

const useStyles = makeStyles(styles);

export default function ConciulSection() {
  const api = process.env.REACT_APP_API_URL;

  const [councilMembers, setCouncilMembers] = useState([]);
  useEffect(() => {
    getCouncilMembers();
  }, []);

  async function getCouncilMembers() {
    try {
      const res = await fetch(
        `${api}/v1/persons/?active=true&council_member=true`
      );
      const data = await res.json();

      setCouncilMembers(data);
      console.log(councilMembers);
    } catch (err) {
      console.error(err);
    }
  }

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section} id="council">
      <h2 className={classes.title}>Membros do conselho</h2>
      <div>
        <GridContainer>
          {councilMembers.map((council, index) => (
            <GridItem key={index} xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src={
                      council.profile_image !== null
                        ? "data:image/png;base64," + council.profile_image
                        : ninja
                    }
                    alt={council.name}
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  {council.name}
                  <br />
                  <small className={classes.smallTitle}>Graduação</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>{council.biography}</p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-twitter"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-instagram"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-facebook"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </div>
  );
}
