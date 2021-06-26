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
//material-ui/icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export default function GraduationListSection() {
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
                <TableCell>{row.color}</TableCell>
                <TableCell align="right">{row.order}</TableCell>
                <TableCell align="center">
                  <IconButton href={editRoout(row.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
