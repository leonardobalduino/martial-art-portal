import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

// @material-ui/icons
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import formStyles from "assets/jss/material-kit-react/components/formStyle.js";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStylesForm = formStyles;
const useStyles = makeStyles(styles);
export default function PersonListSection() {
  const classes = useStyles();
  const classesForm = useStylesForm();

  const [open, setOpen] = React.useState(false);
  const [msgAlert, setMsgAlert] = React.useState("");
  const [idDelete, setIdDelete] = React.useState();
  const [showAlert, setShowAlert] = useState(false);
  const [graduationId, setGraduationId] = useState("");
  const [active, setActive] = useState("");
  const [councilMember, setCouncilMember] = useState("");

  const [persons, setPersons] = useState([]);
  const [graduations, setGraduations] = useState([]);
  useEffect(() => {
    getPersons();
    getGraduations();
  }, []);

  const api = process.env.REACT_APP_API_URL;

  async function getPersons() {
    try {
      let params = "";
      if (graduationId != "") params += "&graduation_id=" + graduationId;
      if (councilMember != "") params += "&council_member=" + councilMember;
      if (active != "") params += "&active=" + active;

      const res = await fetch(`${api}/v1/persons?${params}`);
      const data = await res.json();

      setPersons(data);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteAlert(graduation) {
    setShowAlert(false);
    setMsgAlert("Deseja realmente excluir '" + graduation.name + "'?");
    setIdDelete(graduation.id);
    handleClickOpen();
  }

  async function deleteRegister() {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const res = await fetch(`${api}/v1/persons/${idDelete}`, requestOptions);

      if (!res.ok) {
        setShowAlert(true);
        return;
      }
      getPersons();
    } catch (err) {
      setShowAlert(true);
      console.error(err);
    }
  }

  const renderNotification = () => {
    if (showAlert) {
      return (
        <SnackbarContent
          className={classesForm.errorPositon}
          message={
            <span>
              <b>Erro:</b> {msgAlert}
            </span>
          }
          close
          color="danger"
          icon="info_outline"
        />
      );
    }
  };

  const renderDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Excluir"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msgAlert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              deleteRegister();
            }}
            color="danger"
          >
            Excluir
          </Button>
          <Button onClick={handleClose} color="facebook" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  function editRoout(id) {
    return "/manager/personForm/" + id;
  }

  function renderfilters() {
    return (
      <form className={(classes.form, classesForm.root)}>
        <h5>Filtro</h5>
        <div>
          <form className={(classes.form, classesForm.root)}>
            <FormControl className={classes.formControl}>
              <InputLabel id="graduation-id-label">Graduação</InputLabel>
              <Select
                className={classesForm.inputMedium}
                labelId="graduation-id-label"
                id="graduation_current_id"
                name="graduation_current_id"
                value={graduationId}
                onChange={(e) => setGraduationId(e.target.value)}
              >
                <MenuItem value={""}>Todos</MenuItem>
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
            <FormControl className={classes.formControl}>
              <FormLabel id="council-member-group-label">
                Membros do Conselho
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="council-member-group-label"
                name="council-member-group"
                value={councilMember}
                defaultValue=""
                onChange={(e) => setCouncilMember(e.target["value"])}
              >
                <FormControlLabel value="" control={<Radio />} label="Todos" />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Membros"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Não Membros"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormLabel id="active-group-label">Situação</FormLabel>
              <RadioGroup
                row
                aria-labelledby="active-group-label"
                name="active-group"
                value={active}
                defaultValue=""
                onChange={(e) => setActive(e.target["value"])}
              >
                <FormControlLabel value="" control={<Radio />} label="Todos" />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Ativo"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Inativo"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                color="facebook"
                size="sm"
                className={(classesForm.button, classesForm.center)}
                startIcon={<SearchIcon />}
                onClick={() => {
                  getPersons();
                }}
              >
                Filtrar
              </Button>
            </FormControl>
          </form>
        </div>
      </form>
    );
  }
  return (
    <div>
      <h2>lista de pessoa ({persons.length})</h2>
      {renderfilters()}
      <div>
        <Button
          href="/manager/personForm"
          color="success"
          size="sm"
          startIcon={<EditIcon />}
        >
          Novo
        </Button>
        <br />
        <br />
      </div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Conselho</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>Graduação</TableCell>
              <TableCell align="center">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>
                  {row.council_member == true ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </TableCell>
                <TableCell>
                  {row.active == true ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    style={{
                      p: 2,
                      border: "1px dashed grey",
                      backgroundColor: row.graduation_current.color,
                      cursor: "context-menu",
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;
                  </Box>
                  &nbsp;
                  {row.graduation_current.name}
                </TableCell>
                <TableCell align="center">
                  <IconButton href={editRoout(row.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteAlert(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {renderDialog()}
      {renderNotification()}
    </div>
  );
}
