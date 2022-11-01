import { initialSchemaState } from "./schemaState";
import initialQueryState from "./queryState";
import initialSeedState from "./seedState";

export const initialGlobalState = {
  schemaState: [initialSchemaState],
  queryState: [initialQueryState],
  seedState: [initialSeedState],
};
