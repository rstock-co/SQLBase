import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import mm from 'mermaid'
import Mermaid from './Mermaid';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  height: '85%',
  bgcolor: '#21222c',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 8

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

const createReference = (tableName, reference) => {
  return `${reference} ||--o{ ${tableName} :""`
}
const createTable = (tableName) => {
  return `${tableName} {\n   `
}
const createFields = (fieldName, dataType, reference) => {
  return `${dataType} ${reference ? 'INT ' + reference + ' FK' : fieldName}`
}
const generateMermaid = (state) => {
  let reference = ''
  let output2 =
    `
erDiagram `
  state.map((table) => {
    output2 += `${createTable(table.table)}`
    table.fields.map(field => {
      if (field.reference) reference = createReference(table.table, field.reference)
      output2 += `${createFields(field.fieldName, field.dataType, field.reference)}\n   `

    })
    output2 += `\n  }\n`
    output2 += `  ${reference}\n`
  })
  console.log(output2)
  return output2

}

const ERDModal = (props) => {
  console.table(props.table)
  console.log(generateMermaid(props.table))
  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
      }}
    >
      <Box sx={style}>
        <Typography variant='h3' color={'white'}>Entity Relationship Diagram</Typography>
        <Mermaid chart={generateMermaid(props.table)} />
      </Box>
    </Modal>
  );
}

export default ERDModal;
