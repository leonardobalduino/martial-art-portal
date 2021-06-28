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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

//material-ui/icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export default function GraduationListSection() {
  const [open, setOpen] = React.useState(false);
  const [msgAlert, setMsgAlert] = React.useState("");
  const [idDelete, setIdDelete] = React.useState();
  const [showAlert, setShowAlert] = useState(false);

  const [graduations, setGraduations] = useState([]);
  useEffect(() => {
    getGraduations();
  }, []);

  const api = process.env.REACT_APP_API_URL;

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

      const res = await fetch(
        `${api}/v1/graduations/${idDelete}`,
        requestOptions
      );

      if (!res.ok) {
        setShowAlert(true);
        return;
      }
      getGraduations();
    } catch (err) {
      setShowAlert(true);
      console.error(err);
    }
  }

  const renderNotification = () => {
    if (showAlert) {
      return (
        <SnackbarContent
          message={
            <span>
              <b>Erro:</b> Login ou senha inválido
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
    return "/manager/graduationForm/" + id;
  }

  return (
    <div>
      <h2>lista de graduação</h2>
      <div>
        <Button
          href="/manager/graduationForm"
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
              <TableCell>Cor</TableCell>
              <TableCell align="right">Ordem</TableCell>
              <TableCell align="center">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {graduations.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>
                  <TextField
                    type="color"
                    value={row.color}
                    disabled
                    size="small"
                    style={{ width: "10ch" }}
                  />
                </TableCell>
                <TableCell align="right">{row.order}</TableCell>
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
