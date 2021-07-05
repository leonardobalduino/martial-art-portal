import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
// @material-ui/icons
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import formStyles from "assets/jss/material-kit-react/components/formStyle.js";

const useStyles = makeStyles(styles);
const useStylesForm = formStyles;

export default function PersonFormSection() {
  const classes = useStyles();
  const classesForm = useStylesForm();

  let { id } = useParams();
  let history = useHistory();

  const [graduations, setGraduations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState();
  const [value, setValue] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      number: "",
      city: "",
    },
    graduation_current: {
      name: "",
      graduation_id: "",
      description: "",
      color: "",
    },
    active: false,
  });

  const renderRedirect = () => {
    return history.push("/manager/personList");
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
    if (event.target.type === "checkbox")
      newValue[event.target.id] = event.target.checked;
    else if (event.target.name !== "" && event.target.name !== undefined)
      newValue[event.target.id][event.target.name] = event.target.value;
    else newValue[event.target.id] = event.target.value;
    setValue(newValue);
  }

  function handleChangeGraduation(event) {
    let newValue = Object.assign({}, value);
    newValue["graduation_current"]["graduation_id"] = event.target.value;
    setValue(newValue);
  }

  function handleSubmit(event) {
    setShowAlert(false);
    if (id === undefined) salve();
    else upDate();
    event.preventDefault();
  }

  useEffect(() => {
    getPerson();
    getGraduations();
  }, []);

  const api = process.env.REACT_APP_API_URL;

  async function getPerson() {
    try {
      if (id === undefined) return;

      const res = await fetch(`${api}/v1/persons/${id}`);
      const data = await res.json();

      if (!res.ok) {
        history.push("/manager/personForm");
        return;
      }

      setValue({
        name: data.name,
        email: data.email,
        address: data.address,
        active: data.active,
        graduation_current: data.graduation_current,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function getGraduations() {
    try {
      const res = await fetch(`${api}/v1/graduations`);
      const data = await res.json();

      setGraduations(data);
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

  function newObjectValue() {
    let newValue = Object.assign({}, value);
    delete newValue["graduation_current"];
    newValue["graduation_current_id"] = value.graduation_current.graduation_id;
    return newValue;
  }

  async function salve() {
    try {
      const requestOptions = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(newObjectValue()),
      };

      const res = await fetch(`${api}/v1/persons/`, requestOptions);

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
        body: JSON.stringify(newObjectValue()),
      };

      const res = await fetch(`${api}/v1/persons/${id}`, requestOptions);

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
      <h2>Cadastro de pessoa</h2>
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
            id="email"
            label="Email"
            fullWidth
            value={value.email}
            onChange={handleChange}
          />
          <TextField
            id="address"
            name="street"
            label="Endereço"
            fullWidth
            multiline={true}
            value={value.address.street}
            onChange={handleChange}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="graduation-id-label">Graduação</InputLabel>
            <Select
              className={classesForm.inputMedium}
              labelId="graduation-id-label"
              id="graduation_current"
              name="graduation_id"
              value={value.graduation_current.graduation_id}
              onChange={handleChangeGraduation}
            >
              <MenuItem value={""}></MenuItem>
              {graduations.map((g) => (
                <MenuItem value={g.id} key={g.id}>
                  <Box
                    component="span"
                    style={{
                      p: 2,
                      border: "1px dashed grey",
                      backgroundColor: g.color,
                      cursor: "context-menu",
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;
                  </Box>
                  &nbsp;
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                id="active"
                checked={value.active}
                onChange={handleChange}
              />
            }
            label="Ativo"
          />
          <div className={classesForm.center}>
            <Button
              href="/manager/personList"
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
