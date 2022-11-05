import React from "react";
import ResponsivePieChart from "../charts/pie-chart/ResponsivePieChart";
import { FormInputDropdown } from "../fields/FormInputDropdown";
import useGlobalState from "../../state/hooks/useGlobalState";
import useQueryState from "../../state/hooks/useQueryState";
import { useForm } from "react-hook-form";

const CreateChartsPage = () => {
  const { state, getTableNames, getColumnList } = useGlobalState();
  let schemas = state.queryState[0].schemas;
  const tableNameList = getTableNames();
  const columnNameList = getColumnList();
  const { selectTableHandler } = useQueryState();

  const {
    formState: { errors },
    control,
  } = useForm();

  return (
    <main>
      {schemas.map((table, tableIndex) => {
        <FormInputDropdown
          name={"TableSelect"}
          control={control}
          label={"Table Select"}
          menuOptions={tableNameList}
          handleChange={e => selectTableHandler(e, tableIndex)}
          value={table.table}
        />;
      })}
      <ResponsivePieChart
        width={500}
        height={500}
        chartColor={"#e68209"}
        textColor1={"#e68209"}
        textColor2={"#fcba03"}
      />
    </main>
  );
};

export default CreateChartsPage;
