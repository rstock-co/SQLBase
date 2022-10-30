import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const SchemaTable = ({ table, fields }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table" title={table}>
        <TableHead>
          <TableRow>{table}</TableRow>
        </TableHead>
        <TableBody>
          {fields.map(row => (
            <TableRow
              key={row.fieldName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fieldName}
              </TableCell>
              <TableCell align="left">{row.dataType}</TableCell>
              <TableCell align="left">
                {row.reference ? row.reference + "(FK)" : ""}
              </TableCell>
              <TableCell align="left">{row.mod1}</TableCell>
              <TableCell align="left">{row.mod2}</TableCell>
              <TableCell align="left">{row.default}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
