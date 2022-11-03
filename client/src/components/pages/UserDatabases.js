import { React, useState, useEffect } from 'react';
import { Button, Box, Container, Paper } from '@mui/material'
import useDatabase from '../../state/hooks/useDatabase';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from "../../styles/theme/theme.js";
import EditableField from '../fields/EditableField';
import useSchemaState from '../../state/hooks/useSchemaState';

const UserDatabases = () => {
  const {
    state,
    addSchemaTable,
    removeSchemaTable,
    addSchemaField,
    removeSchemaField,
    handleSchemaChange,
  } = useSchemaState()
  // const [isNameFocused, setIsNamedFocused] = useState(false);
  // const handleEditableField = (focused) => setIsNamedFocused(focused);
  const { saveProgress, loadProgress, loadDatabase, createDatabase, getDatabases } = useDatabase();
  const [list, setList] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDatabaseList = async () => {

      const databases = await getDatabases();

      setList(databases);
    }
    fetchDatabaseList();
  }, []);
  // let databases = getDatabases()

  const loadHandler = (listIndex) => {
    const databaseID = (list.length - listIndex);
    loadDatabase(databaseID);
    navigate("/tables");

  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='false'>


        <Button>Create Database</Button>
        <div>
          {list && list.map((data, listIndex) => {
            return (
              <Box sx={{ margin: 4 }}>
                <Paper>
                  <EditableField handleChange={handleSchemaChange} state={JSON.parse(data.global_state)} />

                  <Button onClick={() => { loadHandler(listIndex) }}>
                    Load Database
                  </Button>
                  <Button onClick={() => { loadHandler(listIndex) }}>
                    Delete Database
                  </Button>
                </Paper>
              </Box>
            )
          })}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default UserDatabases;
