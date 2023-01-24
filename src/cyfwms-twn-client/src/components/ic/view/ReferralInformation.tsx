import { ReferralInformationLabels } from "../../../library/labels/initialContact";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { getAllReferralInfo } from "../../../pages/ic/referralInformation/services";
import { useParams } from "react-router-dom";
const ReferralInformation = (): ReactElement => {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getAllReferralInfo(Number(id)).then(({ data }) => {
      setData(data);
    });
  }, []);
  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="register data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k: any) => {
            if (
              t[1] !== "" &&
              t[1] !== 0 &&
              t[1] !== false &&
              ReferralInformationLabels[k] !== "FileDetailsId" &&
              ReferralInformationLabels[k] !== "ReferralInfoId"
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
                    {ReferralInformationLabels[k]}
                  </TableCell>
                  <TableCell width="50%">
                    <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                      {(typeof t[1]).toString() === "boolean"
                        ? t[1]
                          ? "Yes"
                          : "No"
                        : t[1]}
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

export default ReferralInformation;
