import { initialSchemaState } from "./schemaState";
import initialQueryState from "./queryState";
import initialSeedState from "./seedState";

export const initialGlobalState = {
  databaseName: 'database Name',
  schemaState: [initialSchemaState],
  queryState: [initialQueryState],
  seedState: [initialSeedState],
};

