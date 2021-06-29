import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function GraduationSection(props) {
  const { graduations } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {graduations.map((g, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={`panel${index}a-header`}
          >
            <Typography className={classes.heading}>
              <Box
                component="span"
                style={{
                  p: 2,
                  border: "1px dashed grey",
                  backgroundColor: g.color,
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Box>
              &nbsp;&nbsp;&nbsp;
              {g.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{g.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

GraduationSection.propTypes = {
  graduations: PropTypes.arrayOf(PropTypes.any),
};
