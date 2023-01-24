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
import { searchICParticipant } from "../../../pages/ic/participants/service";
import { useParams, Link } from "react-router-dom";

const Participants = (): ReactElement => {
  const { id } = useParams();
  // const recordsList = useAppSelector((state) => state.icParticipants.record);
  // const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.icParticipants.getData);
  // const popup = useAppSelector((state) => state.popup.open);

  // useEffect(() => {
  //   dispatch(doSearch({ id: data.fileDetailsId, data: "" }));
  // }, [popup]);
  const [data, setData] = useState<any[]>([
    {
      icParticipantId: 0,
      fileDetailsId: 0,
      participant: "",
      role: "",
      notes: "",
    },
  ]);
  useEffect(() => {
    searchICParticipant(Number(id), "").then(({ data }) => {
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
              <Table sx={{ maxWidth: 900 }} aria-label="Participant">
                <TableBody
                  sx={{ "& > tr > td": { border: 0, p: 0, paddingLeft: 5 } }}
                >
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

            {/* <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
              Record : {index + 1}
            </Typography>

            <TableContainer
              sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
            >
              <Table sx={{ maxWidth: 900 }} aria-label="Participants">
                <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                  {Object.entries(data[index]).map((t: any, k: any) => {
                    if (k !== 0 && k !== 1 && t[1] !== "") {
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
                            {t[0]
                              //insert a space before all caps
                              .replace(/([A-Z])/g, " $1")
                              // uppercase the first character
                              .replace(/^./, function (str: String) {
                                return str.toUpperCase();
                              })}
                          </TableCell>
                          <TableCell width="50%">
                            <Typography
                              component="p"
                              sx={{ whiteSpace: "pre-wrap" }}
                            >
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
            </TableContainer> */}
          </>
        ))}
    </>
  );
};

export default Participants;
