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
//material-ui/icons
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import formStyles from "assets/jss/material-kit-react/components/formStyle.js";

const useStylesForm = formStyles;
export default function PersonListSection() {
  const classesForm = useStylesForm();

  const [open, setOpen] = React.useState(false);
  const [msgAlert, setMsgAlert] = React.useState("");
  const [idDelete, setIdDelete] = React.useState();
  const [showAlert, setShowAlert] = useState(false);

  const [persons, setPersons] = useState([]);
  useEffect(() => {
    getPersons();
  }, []);

  const api = process.env.REACT_APP_API_URL;

  async function getPersons() {
    try {
      const res = await fetch(`${api}/v1/persons`);
      const data = await res.json();

      setPersons(data);
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

  return (
    <div>
      <h2>lista de pessoa</h2>
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
