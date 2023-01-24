// import { useAppDispatch, useAppSelector } from "../../../library/hooks";
// import { doGet as doGetRegister } from "../../../features/cyfms/register/slice";
// import { doGet as doGetContact } from "../../../features/cyfms/contact/slice";
// import { doGet as doGetCounselors } from "../../../features/cyfms/counselors/slice";
// import { doGet as doGetCriminalHistory } from "../../../features/cyfms/criminalHistory/slice";
// import { doGet as doGetEducationAndEmployment } from "../../../features/cyfms/educationAndEmployment/slice";
// import { doGet as doGetFamilyPhysicians } from "../../../features/cyfms/familyPhysicians/slice";
// import { doGet as doGetHouseholdMembers } from "../../../features/cyfms/householdMembers/slice";
// import { doGet as doGetOtherInformation } from "../../../features/cyfms/otherInformation/slice";
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
import { Link, useParams } from "react-router-dom";
import { FileDetailsLabels } from "../../../library/labels/initialContact";
import { readFileDetails } from "../../../pages/ic/fileDetails/Service";

const FileDetails = (): ReactElement => {
  // const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.icFileDetails.getData);
  const handleLink = () => {
    // console.log(data.participantId);
    // dispatch(doGetRegister(data.participantId));
    // dispatch(doGetContact(data.participantId));
    // dispatch(doGetEducationAndEmployment(data.participantId));
    // dispatch(doGetOtherInformation(data.participantId));
    // dispatch(doGetCriminalHistory(data.participantId));
    // dispatch(doGetHouseholdMembers(data.participantId));
    // dispatch(doGetFamilyPhysicians(data.participantId));
    // dispatch(doGetCounselors(data.participantId));
  };
  const [data, setData] = useState({
    fileDetailsId: 0,
    fileNumber: 0,
    clientName: "",
    startingDate: "",
    caseworker: "",
    status: "",
    dateClosed: "",
    participantId: 0,
  });
  const { id } = useParams();
  useEffect(() => {
    readFileDetails(Number(id)).then(({ data }) => {
      setData(data);
    });
  }, []);
  return (
    <>
      {data && (
        <>
          {/* <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
            Record : { 1}
          </Typography> */}
          <TableContainer
            sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
          >
            <Table sx={{ maxWidth: 900 }} aria-label="Participant">
              <TableBody
                sx={{ "& > tr > td": { border: 0, p: 0, paddingLeft: 5 } }}
              >
                {data.clientName !== "" ? (
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
                      Client Name
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        <Link to={`/cyfms/view/${data.participantId}`}>
                          {data.clientName}
                        </Link>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {data.startingDate !== "" ? (
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
                      Starting Date
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {data.startingDate}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {data.caseworker !== "" ? (
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
                      CaseWorker
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {data.caseworker}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {data.status !== "" ? (
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
                      Status
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {data.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {data.dateClosed !== "" ? (
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
                      Date Closed
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {data.dateClosed}
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
      )}
    </>
  );
};

export default FileDetails;
