import { removeFamilyPhysician } from "../../../pages/cyfms/familyPhysicians/familyPhysiciansService";
import Input from "../../Input";
import TextArea from "../../TextArea";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import type { FamilyPhysician } from "../../../pages/cyfms/familyPhysicians/familyPhysiciansDatatypes";
import type { FC } from "react";

/**
 * RecordList for family physicians.
 * @example
 * ```jsx
 * <RecordList />
 * ```
 */
const RecordList: FC<{
  data: FamilyPhysician[];
  setData: any;
}> = ({ data, setData }) => {
  const removeFields = (index: any) => {
    const familyPhysicianId = data[index].familyPhysicianId;
    removeFamilyPhysician(familyPhysicianId).then((response) => {
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
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Typography color="primary" sx={{ flexGrow: 1 }}>
                  Family Physician: {index + 1}
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem 0",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}
                  >
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                      <Input
                        autofill={data[index].name}
                        id={`record_${index}_Name`}
                        label="Name"
                        validationPattern={`^[a-zA-Z ]*$`}
                        validationTitle="Digits are not allowed!"
                        value="Name"
                      />
                    </Box>
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                      <Input
                        autofill={data[index].phone}
                        id={`record_${index}_Phone`}
                        validationPattern={`^[^a-zA-Z]*$`}
                        validationTitle="Alphabets are not allowed!"
                        value="Phone"
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}
                  >
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                      <Input
                        autofill={data[index].cell}
                        id={`record_${index}_Cell`}
                        validationPattern={`^[^a-zA-Z]*$`}
                        validationTitle="Alphabets are not allowed!"
                        value="Cell"
                      />
                    </Box>
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
                    <TextArea
                      label="List of Medication"
                      formLabelFlex="1 1 0"
                      outlinedInputFlex="5.3 1 0"
                      autofill={data[index].listOfMedication}
                      id={`record_${index}_ListOfMedication`}
                      value="List of Medication"
                    />
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
                </Box>
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default RecordList;
