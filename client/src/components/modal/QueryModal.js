import React, { useRef, useEffect } from 'react';
import { Modal, Box, Typography, Button, Container } from '@mui/material';
import mm from 'mermaid'
import Mermaid from './Mermaid';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  height: '85%',
  bgcolor: '#21222c',
  boxShadow: 24,
  pt: 4,
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

};

// const example =
//   `erDiagram
//   users {
//    TEXT name
//    INT phone
//    BOOLEAN human

//   }
//   orders {
//    TEXT item
//     INT user FK

//   }
//   users ||--o{ orders :has`
const handleDownload = () => {
  console.log('clicked')
  htmlToImage.toJpeg(document.getElementById('erd'), {
    width: 1920, height: 1080, style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'ERD.jpeg';
      link.href = dataUrl;
      link.click();
    });
}


// const createReference = (tableName, reference) => {
//   return `${reference} ||--o{ ${tableName} :""`
// }
// const createTable = (tableName) => {
//   return `${tableName} {\n   `
// }
// const createFields = (fieldName, dataType, reference) => {
//   return `${dataType} ${reference ? 'INT ' + reference + ' FK' : fieldName}`
// }
// const generateMermaid = (state) => {
//   let reference = ''
//   let output2 =
//     `
// erDiagram `
//   state.map((table) => {
//     output2 += `${createTable(table.table)}`
//     table.fields.map(field => {
//       if (field.reference) reference = createReference(table.table, field.reference)
//       output2 += `${createFields(field.fieldName, field.dataType, field.reference)}\n   `

//     })
//     output2 += `\n  }\n`
//     output2 += `  ${reference}\n`
//   })
//   console.log(output2)
//   return output2

// }

const QueryModal = (props) => {
  // console.log(props)
  // console.table(props.table)
  // console.log(generateMermaid(props.table))

  let tableRef = useRef();
  // handle click outside of modal download button to close modal
  useEffect(() => {
    let handler = (event) => {
      if (!tableRef.current.contains(event.target)) {
        props.onClick();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{}}
    >
      <Box sx={style}>
        <TableContainer id='tableContainer' ref={tableRef} sx={{ color: 'white' }}>
          <Table stickyHeader aria-label="sticky table" sx={{ tableLayout: 'fixed', height: '90%', display: "block", overflowX: "auto", whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow>
                {
                  Object.keys(props.result[0]).map((column) => (
                    <TableCell
                      key={column}
                      align={column.align}
                      style={{ minWidth: 170 }
                      }
                      sx={{ fontSize: '1.3em' }}
                    >
                      {column}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {props.result
                .map((result) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={result.name}>
                      {
                        Object.values(result).map((value) => {
                          // const value = result[field.fieldName];
                          return (
                            <TableCell key={value.id} sx={{ color: 'white', fontSize: '1em', overflow: "hidden", whiteSpace: "nowrap" }}>
                              {value}
                            </TableCell>
                          )

                        })
                      }
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal >
  );
}

export default QueryModal;
