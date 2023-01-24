import { removeHouseholdMember } from "../../../pages/cyfms/householdMembers/householdMembersService";
import Dropdown from "../../Dropdown";
import Input from "../../Input";
import TextArea from "../../TextArea";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import type { HouseholdMember } from "../../../pages/cyfms/householdMembers/householdMembersDatatypes";
import type { FC } from "react";

/**
 * RecordList for household members.
 * @example
 * ```jsx
 * <RecordList />
 * ```
 */
const RecordList: FC<{
  data: HouseholdMember[];
  setData: any;
  gendersCodetable: any;
}> = ({ data, setData, gendersCodetable }) => {
  const removeFields = (index: any) => {
    const householdMemberId = data[index].householdMemberId;
    removeHouseholdMember(householdMemberId).then((response) => {
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
                  Household Member: {index + 1}
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
                  <Input
                    autofill={data[index].name}
                    id={`record_${index}_Name`}
                    validationPattern={`^[a-zA-Z ]*$`}
                    validationTitle="Digits are not allowed!"
                    value="Name"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Dropdown
                    autofill={data[index].gender}
                    id={`record_${index}_Gender`}
                    optionsList={Object.values(gendersCodetable).map(
                      (gender: any) => gender.en
                    )}
                    value="Gender"
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Input
                    autofill={data[index].dateOfBirth}
                    id={`record_${index}_DateOfBirth`}
                    maxDate={new Date().toISOString().substring(0, 10)}
                    minDate="1900-01-01"
                    value="Date of Birth"
                    type="date"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Input
                    autofill={data[index].relationship}
                    id={`record_${index}_Relationship`}
                    value="Relationship"
                  />
                </Box>
              </Box>
              <TextArea
                formLabelFlex="1 1 0"
                outlinedInputFlex="5.3 1 0"
                autofill={data[index].residing}
                id={`record_${index}_Residing`}
                value="Residing"
              />
            </Box>
          );
        })}
    </>
  );
};

export default RecordList;
