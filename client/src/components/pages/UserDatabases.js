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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadIcon from '@mui/icons-material/Download';


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
        <Container id="user-database-container" maxWidth="false">
          <Button
            onClick={() => {
              buttonHandler("create");
            }}
          >
            Create Database
          </Button>
          <div id="database-list">
            {list &&
              list.map((data, listIndex) => {
                let uuid = JSON.parse(data.global_state).databaseUuid;
                console.log(uuid);

                let databaseName = JSON.parse(data.global_state).databaseName;
                console.log(databaseName);
                return (
                  <div className="database-items">
                    <div classname="database-name">
                      <h3>{databaseName}</h3>
                    </div>
                    <div className="database-buttons">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#5755a1",
                          boxShadow: '0 11px 32px -6px #7170a4',
                          ":hover": { backgroundColor: "#7776a3" },
                        }}
                        size='small'
                        onClick={() => {
                          buttonHandler("load", uuid);
                        }}
                      >
                        <DownloadIcon /> Load Database
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#D2042D",
                          boxShadow: '0 8px 20px -6px #DE3163',
                          ":hover": { backgroundColor: "#C41E3A" },
                        }}
                        size='small'
                        onClick={() => {
                          buttonHandler(
                            "delete",
                            uuid,
                            listIndex,
                            databaseName
                          );
                        }}
                      >
                        <DeleteForeverIcon /> Delete Database
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </Container>
        <PageSplitter src="body-purple.png" id="database-tables-bottom" />
      </ThemeProvider>
    </main>
  );
};

export default UserDatabases;
