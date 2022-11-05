import { React, useState, useEffect } from "react";
import { Button, Box, Container, Paper, Typography } from "@mui/material";
import useDatabase from "../../state/hooks/useDatabase";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "../../styles/theme/theme.js";
import EditableField from "../fields/EditableField";
import useSchemaState from "../../state/hooks/useSchemaState";
import { initialGlobalState } from "../../state/data_structures/globalState";
import "./UserDatabases.scss";
import PageSplitter from "../../styles/components/PageSplitter";

const UserDatabases = () => {
  const {
    state,
    addSchemaTable,
    removeSchemaTable,
    addSchemaField,
    removeSchemaField,
    handleSchemaChange,
  } = useSchemaState();

  const {
    saveProgress,
    createNewState,
    loadProgress,
    loadDatabase,
    createDatabase,
    deleteDatabase,
    getDatabases,
  } = useDatabase();
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatabaseList = async () => {
      const databases = await getDatabases();

      setList(databases);
    };
    fetchDatabaseList();
  }, []);
  // let databases = getDatabases()

  const buttonHandler = (target, uuid, listIndex, databaseName) => {
    console.log("listlength", list.length);
    // if (listIndex === list.length) listIndex -= 1
    // if (listIndex === 0) listIndex -= 1
    // const databaseID = (list.length - listIndex);

    if (target === "load") {
      console.log("button uuid,", uuid);
      loadDatabase(uuid);
      navigate("/tables");
    }
    if (target === "delete") {
      // console.log('delete', buttonParams)
      console.log("deleteddb", uuid);
      deleteDatabase(databaseName, uuid);
      const newList = [...list];
      newList.splice(listIndex, 1);
      setList(newList);
    }
    if (target === "create") {
      createNewState();
      navigate("/tables");
    }
  };

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Container id='user-database-container' maxWidth="false">
          <Button
            onClick={() => {
              buttonHandler("create");
            }}
          >
            Create Database
          </Button>
          <div>
            {list &&
              list.map((data, listIndex) => {
                let uuid = JSON.parse(data.global_state).databaseUuid;
                console.log(uuid);

                let databaseName = JSON.parse(data.global_state).databaseName;
                console.log(databaseName);
                return (
                  <Box sx={{ margin: 4 }}>
                    <Paper>
                      <Typography>{databaseName}</Typography>

                      <Button
                        onClick={() => {
                          buttonHandler("load", uuid);
                        }}
                      >
                        Load Database
                      </Button>
                      <Button
                        onClick={() => {
                          buttonHandler(
                            "delete",
                            uuid,
                            listIndex,
                            databaseName
                          );
                        }}
                      >
                        Delete Database
                      </Button>
                    </Paper>
                  </Box>
                );
              })}
          </div>
        </Container>
        <PageSplitter src="body-purple.png" id="tables-bottom" />
      </ThemeProvider>
    </main>
  );
};

export default UserDatabases;
