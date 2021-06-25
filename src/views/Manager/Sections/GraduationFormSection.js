import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);
const useStylesForm = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  inputSmall: {
    width: "10ch",
  },
  inputLarge: {
    width: "100ch",
  },
  invisible: {
    display: "none",
  },
}));

export default function GraduationFormSection() {
  const classes = useStyles();
  const classesForm = useStylesForm();

  let { id } = useParams();

  const [graduation, setGraduation] = useState([]);
  useEffect(() => {
    getGraduation();
  }, []);

  const api = process.env.REACT_APP_API_URL;

  async function getGraduation() {
    try {
      const res = await fetch(`${api}/v1/graduations/${id}`);
      const data = await res.json();

      setGraduation(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Cadastro de graduação</h2>
      <form className={(classes.form, classesForm.root)}>
        <TextField
          id="name"
          label="Nome"
          fullWidth
          required
          value={graduation.name}
          defaultValue={graduation.name}
        />
        <TextField
          id="description"
          label="Descrição"
          fullWidth
          multiline={true}
          defaultValue={graduation.description}
        />
        <TextField
          id="order"
          type="number"
          label="Ordem"
          className={classesForm.inputSmall}
          value={graduation.order}
        />
        <TextField
          id="color"
          type="color"
          label="Cor"
          className={classesForm.inputSmall}
          value={graduation.color}
          defaultValue={graduation.color}
        />
        <TextField
          id="id"
          type="hidden"
          InputProps={{
            readOnly: true,
          }}
          value={graduation.id}
          defaultValue={graduation.id}
          className={classesForm.invisible}
        />
      </form>
    </div>
  );
}
