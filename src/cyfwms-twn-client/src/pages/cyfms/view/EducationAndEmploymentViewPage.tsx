import { EducationAndEmploymentLabels } from "../../../library/labels/cyfms";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { EducationAndEmployment } from "../educationAndEmployment/educationAndEmploymentDatatypes";
import type { FC } from "react";
import { readEducationAndEmployment } from "../educationAndEmployment/educationAndEmploymentService";

const EducationAndEmploymentViewPage: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<EducationAndEmployment>({
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
    readEducationAndEmployment(Number(id)).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table
        sx={{ maxWidth: 900 }}
        aria-label="education and employment data table"
      >
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k: any) => {
            if (
              t[1] !== "" &&
              t[1] !== 0 &&
              EducationAndEmploymentLabels[k] !== "ParticipantId" &&
              EducationAndEmploymentLabels[k] !== "EmploymentId" &&
              EducationAndEmploymentLabels[k] !== "EducationId"
            ) {
              return (
                <TableRow key={Math.random() * 1000}>
                  <TableCell
                    sx={{
                      display: "flex",
                      width: "50%",
                      alignContent: "start",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    {EducationAndEmploymentLabels[k]}
                  </TableCell>
                  <TableCell width="50%">
                    <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                      {t[1]}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            }
            return <></>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EducationAndEmploymentViewPage;
