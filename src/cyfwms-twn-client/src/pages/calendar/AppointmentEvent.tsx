import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

import moment from "moment";
import { getAllAppointmentByDate } from "./service";
import { AppointmentData } from "./CalendarDataType";
import { PopupDispatchContext } from "../../contexts/PopupContext";
import { TabbarDispatchContext } from "../../contexts/TabbarContext";

const AppointmentEvent: any = (props: any) => {
  const tabbarDispatchContext = useContext(TabbarDispatchContext);
  const popupDispatchContext = useContext(PopupDispatchContext);
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState<AppointmentData[]>([
    {
      appointmentId: 0,
      subject: "",
      status: "",
      date: "",
      participantId: 0,
      icAppointmentId: 0,
      cgProviderId: 0,
    },
  ]);
  useEffect(() => {
    if (props.date) {
      getAllAppointmentByDate(props.date).then(({ data }) => {
        setData(data);
      });
    }
  }, [props.date]);

  useEffect(() => {
    getAllAppointmentByDate(moment(new Date()).format("yyyy-MM-DD")).then(
      ({ data }) => {
        setData(data);
      }
    );
  }, []);

  return (
    <div>
      {isMatch ? (
        <>
          <Table sx={{ width: 369 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "white",
                }}
              >
                <TableCell
                  sx={{ color: "white", width: 10 }}
                  align="center"
                  size="small"
                ></TableCell>
                <TableCell
                  sx={{ color: "white", width: 10 }}
                  align="center"
                  size="small"
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{ color: "white", width: 10 }}
                  align="center"
                  size="small"
                >
                  Subject
                </TableCell>
                <TableCell
                  sx={{ color: "white", width: 10 }}
                  align="center"
                  size="small"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& > tr > td": {
                  backgroundColor: grey["400"],
                  p: "0.25rem",
                },
                "& > tr": { border: 0 },
              }}
            >
              {data.map((val: any, key: any) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{ color: "black" }}
                    align="center"
                    size="small"
                  >
                    {val.participantId && (
                      <Link
                        to={`/cyfms/appointment/${val.participantId}`}
                        onClick={() => {
                          popupDispatchContext({
                            type: "open",
                            open: true,
                          });
                          tabbarDispatchContext({
                            type: "toggle_hidden",
                            hidden: false,
                          });
                        }}
                      >
                        Select
                      </Link>
                    )}
                    {val.fileDetailsId && (
                      <Link
                        to={`/ic/appointment/${val.fileDetailsId}`}
                        onClick={() => {
                          popupDispatchContext({
                            type: "open",
                            open: true,
                          });
                          tabbarDispatchContext({
                            type: "toggle_hidden",
                            hidden: false,
                          });
                        }}
                      >
                        Select
                      </Link>
                    )}
                    {val.cgProviderId && (
                      <Link
                        to={`/cg/appointments/${val.cgProviderId}`}
                        onClick={() => {
                          popupDispatchContext({
                            type: "open",
                            open: true,
                          });
                          tabbarDispatchContext({
                            type: "toggle_hidden",
                            hidden: false,
                          });
                        }}
                      >
                        Select
                      </Link>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{ color: "black" }}
                    align="center"
                    size="small"
                  >
                    {val.date}
                  </TableCell>
                  <TableCell
                    sx={{ color: "black" }}
                    align="center"
                    size="small"
                  >
                    {val.subject}
                  </TableCell>
                  <TableCell
                    sx={{ color: "black" }}
                    align="center"
                    size="small"
                  >
                    {val.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "white",
                }}
              >
                <TableCell
                  sx={{ color: "white" }}
                  align="center"
                  size="small"
                ></TableCell>
                <TableCell sx={{ color: "white" }} align="center" size="small">
                  Date
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center" size="small">
                  Subject
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center" size="small">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& > tr > td": {
                  backgroundColor: grey["400"],
                  p: "0.25rem",
                },
                "& > tr": { border: 0 },
              }}
            >
              {data.map((val: any, key: any) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{ color: "black" }}
                    align="center"
                    size="small"
                  >
                    {val.participantId && (
                      <Link
                        to={`/cyfms/appointment/${val.participantId}`}
                        onClick={() => {
                          popupDispatchContext({
                            type: "open",
                            open: true,
                          });
                          tabbarDispatchContext({
                            type: "toggle_hidden",
                            hidden: false,
                          });
                        }}
                      >
                        Select
                      </Link>
                    )}
                    {val.fileDetailsId && (
                      <Link
                        to={`/ic/appointment/${val.fileDetailsId}`}
                        onClick={() => {
                          popupDispatchContext({
                            type: "open",
                            open: true,
                          });
                          tabbarDispatchContext({
                            type: "toggle_hidden",
                            hidden: false,
                          });
                        }}
                      >
                        Select
                      </Link>
                    )}
                    {val.cgProviderId && (
                      <Link
                        to={`/cg/appointments/${val.cgProviderId}`}
                        onClick={() => {
                          popupDispatchContext({
                            type: "open",
                            open: true,
                          });
                          tabbarDispatchContext({
                            type: "toggle_hidden",
                            hidden: false,
                          });
                        }}
                      >
                        Select
                      </Link>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{ color: "black" }}
                    align="center"
                    size="small"
                  >
                    {val.date}
                  </TableCell>
                  <TableCell
                    sx={{ color: "black" }}
                    align="center"
                    size="small"
                  >
                    {val.subject}
                  </TableCell>
                  <TableCell
                    sx={{ color: "black" }}
                    align="center"
                    size="small"
                  >
                    {val.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default AppointmentEvent;
