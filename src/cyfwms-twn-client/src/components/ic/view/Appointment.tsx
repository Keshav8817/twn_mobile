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
import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { ReactElement, useEffect } from "react";
import { searchICAppointment } from "../../../pages/ic/appointments/service";
import { Data } from "../../../pages/ic/appointments/AppointmentDataTypes";

const Appointment: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<any[]>([
    {
      icappointmentId: 0,
      fileDetailsId: 0,
      fileDetailsNo: 0,
      appointmentId: 0,
      subject: "",
      status: "",
      date: "",
      time: "",
      location: "",
      duration: "",
      client: "",
      caseworker: "",
      recurringAppointment: "",
      frequency: "",
      endDate: "",
      notes: "",
    },
  ]);
  useEffect(() => {
    searchICAppointment(Number(id), "").then(({ data }) => {
      setData(data);
    });
  }, []);
  // const recordsList = useAppSelector((state) => state.icAppointment.record2);
  // const data = useAppSelector((state) => state.icFileDetails.getData);
  // const { id, clientName } = useAppSelector((state) => state.icAppointment);
  // const dispatch = useAppDispatch();
  // const handleLink = () => {
  //   console.log(id);
  //   dispatch(doGetRegister(id));
  //   dispatch(doGetContact(id));
  //   dispatch(doGetEducationAndEmployment(id));
  //   dispatch(doGetOtherInformation(id));
  //   dispatch(doGetCriminalHistory(id));
  //   dispatch(doGetHouseholdMembers(id));
  //   dispatch(doGetFamilyPhysicians(id));
  //   dispatch(doGetCounselors(id));
  // };
  const handleLink = () => {};
  console.log(data);
  if (data.length === 0) {
    if (true) {
      return <></>;
    }
  }
  console.log(data);
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
                  {data[index].subject !== "" ? (
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
                        Subject
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].subject}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].status !== "" ? (
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
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].date !== "" ? (
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
                        Date
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].date}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].time !== "" ? (
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
                        Time
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].time}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].location !== "" ? (
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
                        Location
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].location}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].duration !== "" ? (
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
                        Duration
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].duration}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}

                  {data[index].client !== "" ? (
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
                        Client
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          <Link
                            to={`/cyfms/view/${data[index].participantId}`}
                            onClick={handleLink}
                          >
                            {data[index].client}
                          </Link>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].caseworker !== "" ? (
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
                        Caseworker
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].caseworker}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].recurringAppointment !== "" ? (
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
                        Is this a recurring appointment
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].recurringAppointment}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].frequency !== "" ? (
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
                        Frequency
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].frequency}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                  {data[index].endDate !== "" ? (
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
                        End Date
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {data[index].endDate}
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

export default Appointment;
