import { CriminalHistory } from "../../../pages/cyfms/criminalHistory/criminalHistoryDatatypes";
import { removeCriminalHistory } from "../../../pages/cyfms/criminalHistory/criminalHistoryService";
import Input from "../../Input";
import TextArea from "../../TextArea";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import type { FC } from "react";

/**
 * RecordList for criminal history.
 * @example
 * ```jsx
 * <RecordList />
 * ```
 */
const RecordList: FC<{
  data: CriminalHistory;
  setData: any;
}> = ({ data, setData }) => {
  const handleCriminalRecordChange = (index: any, value: any, type: any) => {
    const updatedData: any = JSON.parse(JSON.stringify(data));
    updatedData.criminalHistoryRecordList[index][type] = value;
    setData(updatedData);
  };

  const removeFields = (index: any) => {
    const criminalHistoryId =
      data.criminalHistoryRecordList[index].criminalHistoryRecordId;
    removeCriminalHistory(criminalHistoryId).then((response) => {
      const updatedData: any = JSON.parse(JSON.stringify(data));
      const filterRecords: any = updatedData.criminalHistoryRecordList.filter(
        (_: any, i: number) => i !== index
      );
      updatedData.criminalHistoryRecordList = filterRecords;
      setData(updatedData);
    });
  };

  return (
    <>
      {data &&
        data.criminalHistoryRecordList.map((form: any, index: any) => {
          return (
            <div key={index} className="myform">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem 0",
                  p: "0.5rem",
                  borderRadius: "1rem",
                  boxShadow: `inset 2px 2px 3px rgba(191, 191, 191, .6),
                    inset -2px -2px 3px rgba(0, 0, 0, .6)`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem 0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0 1rem",
                    }}
                  >
                    <Typography color="primary" sx={{ flexGrow: 1 }}>
                      Record {index + 1}
                    </Typography>
                    <IconButton
                      aria-label="delete record"
                      size="medium"
                      color="primary"
                      sx={{ p: 0 }}
                      onClick={() => {
                        removeFields(index);
                      }}
                    >
                      <CancelIcon fontSize="medium" />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0 1rem",
                    }}
                  >
                    <Box sx={{ flexBasis: "0", flexGrow: 1 }}>
                      <Input
                        autofill={
                          data.criminalHistoryRecordList[index].arrestDate
                        }
                        // onChange={(e: any) => {
                        //   handleCriminalRecordChange(
                        //     index,
                        //     e.target.value,
                        //     "arrestDate"
                        //   );
                        // }}
                        id={`record_${index}_ArrestDate`}
                        maxDate={new Date().toISOString().substring(0, 10)}
                        minDate="1900-01-01"
                        value="Arrest Date"
                        type="date"
                      />
                    </Box>
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
                  </Box>
                  <TextArea
                    // onChange={(e: any) => {
                    //   handleCriminalRecordChange(
                    //     index,
                    //     e.target.value,
                    //     "charges"
                    //   );
                    // }}
                    formLabelFlex="1 1 0"
                    outlinedInputFlex="5.3 1 0"
                    autofill={data.criminalHistoryRecordList[index].charges}
                    id={`record_${index}_Charges`}
                    value="Charges"
                  />
                  <TextArea
                    // onChange={(e: any) => {
                    //   handleCriminalRecordChange(
                    //     index,
                    //     e.target.value,
                    //     "conviction"
                    //   );
                    // }}
                    formLabelFlex="1 1 0"
                    outlinedInputFlex="5.3 1 0"
                    autofill={data.criminalHistoryRecordList[index].conviction}
                    id={`record_${index}_Conviction`}
                    value="Conviction"
                  />
                  <TextArea
                    // onChange={(e: any) => {
                    //   handleCriminalRecordChange(
                    //     index,
                    //     e.target.value,
                    //     "sentence"
                    //   );
                    // }}
                    formLabelFlex="1 1 0"
                    outlinedInputFlex="5.3 1 0"
                    autofill={data.criminalHistoryRecordList[index].sentence}
                    id={`record_${index}_Sentence`}
                    value="Sentence"
                  />
                </Box>
              </Box>
            </div>
          );
        })}
    </>
  );
};

export default RecordList;
