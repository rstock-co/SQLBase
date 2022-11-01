import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SchemaTable = ({ table, fields }) => {
  return (
    <TableContainer component={Paper} sx={{
      width: 400
    }}>
      <Table sx={{ minWidth: 200, minHeight: 150 }} size='small' aria-label="simple table" title={table}>
        <TableHead>
          <TableRow key={table}>{table}</TableRow>
        </TableHead>
        <TableBody>
          {fields.map(row => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 }, height: '50px' }}
            >
              <TableCell component="th" scope="row">
                {row.fieldName}
              </TableCell>
              <TableCell align="right">
                {`${row.dataType}   ${row.reference ? row.reference + "(FK)" : ""}    ${row.mod1}   ${row.mod2} `}
              </TableCell>
              {/* <TableCell align="left">{row.dataType}</TableCell> */}
              {/* <TableCell align="left">
                {row.reference ? row.reference + "(FK)" : ""}
              </TableCell>
              <TableCell align="left">{row.mod1}</TableCell>
              <TableCell align="left">{row.mod2}</TableCell> */}
              {/* <TableCell align="left">{row.default}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SchemaTable;
