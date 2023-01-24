import { removeCounselor } from "../../../pages/cyfms/counselors/counselorsService";
import Dropdown from "../../Dropdown";
import Input from "../../Input";
import TextArea from "../../TextArea";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import type { Counselor } from "../../../pages/cyfms/counselors/counselorsDatatypes";
import type { FC } from "react";

/**
 * RecordList for counselors.
 * @example
 * ```jsx
 * <RecordList />
 * ```
 */
const RecordList: FC<{
  data: Counselor[];
  setData: any;
  rolesCodetable: any;
}> = ({ data, setData, rolesCodetable }) => {
  const removeFields = (index: any) => {
    const counselorCFSWorkerId = data[index].counselorCFSWorkerId;
    removeCounselor(counselorCFSWorkerId).then((response) => {
      const updatedData: any = JSON.parse(JSON.stringify(data));
      const filterRecords: any = updatedData.filter(
        (_: any, i: number) => i !== index
      );
      setData(filterRecords);
    });
  };

  return (
    <>
      {data &&
        data.map((form: any, index: any) => {
          return (
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
                  flexWrap: "wrap",
                  gap: "0 1rem",
                }}
              >
                <Typography color="primary" sx={{ flexGrow: 1 }}>
                  Counselor / CFS Worker: {index + 1}
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
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Dropdown
                    autofill={data[index].role}
                    id={`record_${index}_Role`}
                    value="Role"
                    optionsList={Object.values(rolesCodetable).map(
                      (role: any) => role.en
                    )}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Input
                    autofill={data[index].name}
                    id={`record_${index}_Name`}
                    validationPattern={`^[a-zA-Z ]*$`}
                    validationTitle="Digits are not allowed!"
                    value="Name"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Input
                    autofill={data[index].startDate}
                    id={`record_${index}_StartDate`}
                    maxDate={new Date().toISOString().substring(0, 10)}
                    minDate="1900-01-01"
                    value="Start Date"
                    type="date"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Input
                    autofill={data[index].endDate}
                    id={`record_${index}_EndDate`}
                    maxDate={new Date().toISOString().substring(0, 10)}
                    minDate="1900-01-01"
                    value="End Date"
                    type="date"
                  />
                </Box>
              </Box>
              <TextArea
                formLabelFlex="1 1 0"
                outlinedInputFlex="5.3 1 0"
                autofill={data[index].contactInformation}
                id={`record_${index}_ContactInformation`}
                value="Contact Information"
              />
            </Box>
          );
        })}
    </>
  );
};

export default RecordList;
