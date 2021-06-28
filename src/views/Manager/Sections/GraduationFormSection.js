import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
// @material-ui/icons
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);
const useStylesForm = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
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
  center: {
    textAlign: "center",
  },
}));

export default function GraduationFormSection() {
  const classes = useStyles();
  const classesForm = useStylesForm();

  let { id } = useParams();
  let history = useHistory();

  const [showAlert, setShowAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState();
  const [value, setValue] = useState({
    name: "",
    description: "",
    order: 0,
    color: "#ffffff",
  });

  const renderRedirect = () => {
    return history.push("/manager/graduationList");
  };

  const renderNotification = () => {
    if (showAlert) {
      return (
        <SnackbarContent
          message={
            <span>
              <b>Erro:</b> {msgAlert}
            </span>
          }
          color="danger"
          icon="info_outline"
        />
      );
    }
  };

  function handleChange(event) {
    let newValue = Object.assign({}, value);
    newValue[event.target.id] = event.target.value;
    setValue(newValue);
  }

  function handleSubmit(event) {
    setShowAlert(false);
    if (id === undefined) salve();
    else upDate();
    event.preventDefault();
  }

  useEffect(() => {
    getGraduation();
  }, []);

  const api = process.env.REACT_APP_API_URL;

  async function getGraduation() {
    try {
      if (id === undefined) return;

      const res = await fetch(`${api}/v1/graduations/${id}`);
      const data = await res.json();

      if (!res.ok) {
        history.push("/manager/graduationForm");
        return;
      }

      setValue({
        name: data.name,
        description: data.description,
        order: data.order,
        color: data.color,
      });
    } catch (err) {
      console.error(err);
    }
  }

  function getHeaders() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    return headers;
  }

  async function salve() {
    try {
      const requestOptions = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(value),
      };

      const res = await fetch(`${api}/v1/graduations/`, requestOptions);

      if (!res.ok) {
        const data = await res.json();
        setMsgAlert(data.msg !== undefined ? data.msg : data.message);
        setShowAlert(true);
        return;
      }
      renderRedirect();
    } catch (err) {
      setShowAlert(true);
      console.error(err);
    }
  }

  async function upDate() {
    try {
      const requestOptions = {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(value),
      };

      const res = await fetch(`${api}/v1/graduations/${id}`, requestOptions);

      if (!res.ok) {
        setShowAlert(true);
        return;
      }
      renderRedirect();
    } catch (err) {
      setShowAlert(true);
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Cadastro de graduação</h2>
      <div>
        <form
          className={(classes.form, classesForm.root)}
          onSubmit={handleSubmit}
        >
          <TextField
            id="name"
            label="Nome"
            fullWidth
            required
            value={value.name}
            onChange={handleChange}
          />
          <TextField
            id="description"
            label="Descrição"
            fullWidth
            multiline={true}
            value={value.description}
            onChange={handleChange}
          />
          <TextField
            id="order"
            type="number"
            label="Ordem"
            required
            className={classesForm.inputSmall}
            value={value.order}
            onChange={handleChange}
          />
          <TextField
            id="color"
            type="color"
            label="Cor"
            className={classesForm.inputSmall}
            value={value.color}
            onChange={handleChange}
          />
          <div className={classesForm.center}>
            <Button
              href="/manager/graduationList"
              variant="contained"
              color="facebook"
              size="sm"
              className={classesForm.button}
              startIcon={<CancelIcon />}
            >
              Cancelar
            </Button>
            <Button
              color="success"
              size="sm"
              type="submit"
              className={(classesForm.button, classesForm.center)}
              startIcon={<SaveIcon />}
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
      {renderNotification()}
    </div>
  );
}
