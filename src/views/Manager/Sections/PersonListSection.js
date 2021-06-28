import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function PersonListSection() {
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

  return (
    <div>
      <h2>lista de pessoa</h2>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>Graduação</TableCell>
              <TableCell align="center">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.active == true ? "ativo" : "desativo"}
                </TableCell>
                <TableCell>{row.graduation_current.name}</TableCell>
                <TableCell align="center">editar</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
