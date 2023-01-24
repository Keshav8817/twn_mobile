import { OtherInformationLabels } from "../../../library/labels/cyfms";
import { readOtherInformation } from "../otherInformation/otherInformationService";
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
import type { OtherInformation } from "../otherInformation/otherInformationDatatypes";
import type { FC } from "react";

const OtherInformationViewPage: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<OtherInformation>({
    participantId: Number(id),
    participantOtherInfoId: 0,
    strength: "",
    weakness: "",
    skills: "",
    experiences: "",
    effectiveCopingSkills: "",
  });

  useEffect(() => {
    readOtherInformation(Number(id)).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="other information data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k: any) => {
            if (
              t[1] !== "" &&
              t[1] !== 0 &&
              OtherInformationLabels[k] !== "ParticipantId" &&
              OtherInformationLabels[k] !== "ParticipantOtherInfoId"
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
                    {OtherInformationLabels[k]}
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

export default OtherInformationViewPage;
