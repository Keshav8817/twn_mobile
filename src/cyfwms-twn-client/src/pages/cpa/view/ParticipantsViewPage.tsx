import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ReactElement, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { searchCPAParticipant } from "../Participants/Service";

const ParticipantsViewPage = (): ReactElement => {
  const { id } = useParams();

  const [data, setData] = useState<any[]>([
    {
      participantCulturalProId: 0,
      culturalProgramId: 0,
      participant: "",
      role: "",
      notes: "",
    },
  ]);
  useEffect(() => {
    searchCPAParticipant(Number(id), "").then(({ data }) => {
      setData(data);
    });
  }, []);

  return (
    <>
      {data &&
        Object.entries(data).map((t: any, index: number) => (
          <>
            <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
              Record : {index + 1}
            </Typography>

            <TableContainer
              sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
            >
              <Table sx={{ maxWidth: 900 }} aria-label="Participants">
                <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                  {data[index].participant !== "" ? (
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
                        Participant
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          <Link to={`/cyfms/view/${data[index].participantId}`}>
                            {data[index].participant}
                          </Link>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].role !== "" ? (
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
                        Role
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].role}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].notes !== "" ? (
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
                        Notes
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].notes}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ))}
    </>
  );
};

export default ParticipantsViewPage;
