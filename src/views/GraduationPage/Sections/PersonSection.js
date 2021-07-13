import React, { useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "left",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function PersonSection(props) {
  const { graduation } = props;
  const classes = useStyles();

  const api = process.env.REACT_APP_API_URL;

  const [persons, setPersons] = useState([]);
  useEffect(() => {
    getPersons();
  }, []);

  async function getPersons() {
    try {
      const res = await fetch(
        `${api}/v1/persons/?active=true&graduation_id=${graduation.id}`
      );
      const data = await res.json();

      setPersons(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={classes.root}>
      {persons.map((person) => (
        <div key={person.id}>
          - {person.name}
          <br />
        </div>
      ))}
    </div>
  );
}

PersonSection.propTypes = {
  graduation: PropTypes.object,
};
