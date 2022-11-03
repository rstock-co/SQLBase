import { React, useState, useEffect } from 'react';
import { Button, Box } from '@mui/material'
import useDatabase from '../../state/hooks/useDatabase';
import { useNavigate } from 'react-router-dom';

const UserDatabases = () => {
  const navigate = useNavigate()
  const { saveProgress, loadProgress, loadDatabase, createDatabase, getDatabases } = useDatabase();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchDatabaseList = async () => {

      const databases = await getDatabases();

      setList(databases);
    }
    fetchDatabaseList();
  }, []);
  // let databases = getDatabases()

  const loadHandler = (listIndex) => {
    const databaseID = listIndex + 1;
    loadDatabase(databaseID);
    navigate("/tables");

  }

  console.log('list', list)
  return (
    <div>
      {list && list.map((data, listIndex) => {
        return (
          <Box>
            {JSON.parse(data.global_state).databaseName}
            <Button onClick={() => { loadHandler(listIndex) }}>Load Database</Button>
          </Box>
        )
      })}
    </div>
  );
}

export default UserDatabases;
