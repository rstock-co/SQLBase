import React, { useRef, useEffect } from 'react';
import { Modal, Box, Typography, Button, Container } from '@mui/material';
import mm from 'mermaid'
import Mermaid from './Mermaid';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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
  htmlToImage.toJpeg(document.getElementById('erd'), { quality: 0.95, width: 1920, height: 1080 })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'ERD.jpeg';
      link.href = dataUrl;
      link.click();
    });
}


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
  console.log(props)
  console.table(props.table)
  console.log(generateMermaid(props.table))

  let downloadRef = useRef();

  // handle click outside of modal download button to close modal
  useEffect(() => {
    let handler = (event) => {
      if (!downloadRef.current.contains(event.target)) {
        props.onClick()
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler)
    };
  });

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
      }
      }
    >
      <Box sx={style}>
        <Container id={'erd'} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant='h3' color={'white'}
            sx={{
              pt: 4,
              pb: 4
            }}
          >
            Entity Relationship Diagram
          </Typography>
          <Mermaid chart={generateMermaid(props.table)} />
        </Container>
        <Box sx={{
          position: 'absolute',
          bottom: '4em',
          bgcolor: '#23222c',
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
        }}>
          <Button ref={downloadRef} onClick={handleDownload} sx={{
            color: '#fff',
            fontSize: 16
          }}>
            DOWNLOAD
          </Button>
        </Box>
      </Box>
    </Modal >
  );
}

export default ERDModal;
