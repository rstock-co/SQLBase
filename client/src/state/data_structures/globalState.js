import { initialSchemaState } from "./schemaState";
import { initialQueryState } from "./queryState";
import { initialSeedState } from "./seedState";

import uuid from 'react-uuid'

export const initialGlobalState = {
  databaseName: 'database_name',
  databaseUuid: uuid(),
  schemaState: [initialSchemaState],
  queryState: [initialQueryState],
  seedState: [initialSeedState],
};
