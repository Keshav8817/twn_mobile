import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import CYFMSDropdown from "../../../components/Dropdown";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import { onKeyDown } from "../../../library/app";
import {
  getEducationAndEmploymentCodetable,
  getTypesOfEmployeeCodetable,
} from "../../../services/codetableService";
import {
  readEducationAndEmployment,
  saveEducationAndEmployment,
} from "./educationAndEmploymentService";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { EducationAndEmployment } from "./educationAndEmploymentDatatypes";
import type { FC } from "react";

/**
 * `EducationAndEmploymentPage`
 */
const EducationAndEmploymentPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edAndEmpCodetable, setEdAndEmpCodetable] = useState<any>([]);
  const [typeOfEmpCodetable, setTypeOfEmpCodetable] = useState<any>([]);
  const [disabled, setDisabled] = useState(false);
  const [disabledSchoolFields, setDisabledSchoolFields] =
    useState<boolean>(true);
  const [disabledDesiredProfession, setDisabledDesiredProfession] =
    useState<boolean>(true);
  const [state, setState] = useState<EducationAndEmployment>({
    participantId: Number(id),
    educationId: 0,
    employmentId: 0,
    attendingSchool: "",
    school: "",
    grade: "",
    employed: "",
    typeOfEmployment: "",
    desiredProfession: "",
  });

  useEffect(() => {
    getEducationAndEmploymentCodetable().then((response) => {
      setEdAndEmpCodetable(response.data.valuesMap);
    });
    getTypesOfEmployeeCodetable().then((response) => {
      setTypeOfEmpCodetable(response.data.valuesMap);
    });
    readEducationAndEmployment(Number(id)).then((response) => {
      if (response.data.attendingSchool === "Yes") {
        setDisabledSchoolFields(false);
      }
      if (response.data.typeOfEmployment === "Job Search") {
        setDisabledDesiredProfession(false);
      }
      setState(response.data);
      if (state.participantId !== 0) {
        setDisabled(true);
      }
    });
  }, []);

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = {
            participantId: Number(id),
            educationId: state.educationId,
            employmentId: state.employmentId,
            attendingSchool: event.currentTarget.attendingSchool.value,
            school: event.currentTarget.schoolName.value,
            grade: event.currentTarget.schoolGrade.value,
            employed: event.currentTarget.employed.value,
            typeOfEmployment: event.currentTarget.typeOfEmployment.value,
            desiredProfession: event.currentTarget.desiredProfession.value,
          };
          saveEducationAndEmployment(formData).then(() => {
            navigate(`../criminal_history/${id}`);
          });
        }}
        onChange={(event) => {
          if (event.currentTarget.attendingSchool.value === "Yes") {
            setDisabledSchoolFields(false);
          } else {
            event.currentTarget.schoolName.value = "";
            event.currentTarget.schoolGrade.value = "";
            setDisabledSchoolFields(true);
          }
          if (event.currentTarget.typeOfEmployment.value === "Job Search") {
            setDisabledDesiredProfession(false);
          } else {
            event.currentTarget.desiredProfession.value = "";
            setDisabledDesiredProfession(true);
          }
        }}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <Box>
            <Typography variant="body1" color="primary">
              Education
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSDropdown
                    autofill={state.attendingSchool}
                    id="attendingSchool"
                    value="Attending School?"
                    optionsList={Object.values(edAndEmpCodetable).map(
                      (education: any) => education.en
                    )}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  flexGrow: 5,
                }}
              >
                <Box sx={{ flexBasis: 0, flexGrow: 0.5 }}>
                  <Input
                    autofill={state.school}
                    disabled={disabledSchoolFields}
                    id="schoolName"
                    value="School"
                    validationPattern={`^[a-zA-Z0-9 ]*$`}
                    validationTitle="Digits are not allowed!"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 0.5 }}>
                  <Input
                    autofill={state.grade}
                    disabled={disabledSchoolFields}
                    id="schoolGrade"
                    value="Grade"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" color="primary">
              Employment
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSDropdown
                    autofill={state.employed}
                    id="employed"
                    value="Employed?"
                    optionsList={Object.values(edAndEmpCodetable).map(
                      (education: any) => education.en
                    )}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSDropdown
                    autofill={state.typeOfEmployment}
                    id="typeOfEmployment"
                    value="Type of Employment"
                    optionsList={Object.values(typeOfEmpCodetable).map(
                      (employee: any) => employee.en
                    )}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0 1rem",
                }}
              >
                <Box sx={{ flexBasis: 0, flexGrow: 0.999999 }}>
                  <Input
                    autofill={state.desiredProfession}
                    disabled={disabledDesiredProfession}
                    id="desiredProfession"
                    validationPattern={`^[a-zA-Z ]*$`}
                    validationTitle="Digits are not allowed!"
                    value="Desired Profession"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default EducationAndEmploymentPage;
