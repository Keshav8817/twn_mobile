import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import type { FC } from "react";
import { readCareProvider } from "../careProvider/CareProviderService";
import { Data } from "../careProvider/CareProviderDataType";

const CareProviderViewPage: FC = () => {
  const handlePrimaryCaregiver = () => {};
  const { id } = useParams();
  const [data, setData] = useState<any>({
    Id: 0,
    referenceId: 0,
    name: "",
    status: "",
    type: "",
    otherType: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    phoneNumber: "",
    email: "",
    primaryCaregiver: "",
    secondaryCaregiver: "",
    priParticipantId: 0,
  });

  const handleSecondaryCaregiver = () => {};

  useEffect(() => {
    readCareProvider(Number(id)).then(({ data }) => {
      setData(data);
    });
  }, []);
  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }}>
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {data.referenceId !== 0 ? (
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
                Reference ID
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.referenceId}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.name !== "" ? (
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
                Name
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.name}
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
          {data.type !== "" ? (
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
                Type
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.type}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.otherType !== "" ? (
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
                Please Specify
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.otherType}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.address !== "" ? (
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
                Address
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.address}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.city !== "" ? (
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
                City
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.city}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.postalCode !== "" ? (
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
                Postal Code
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.postalCode}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}

          {data.province !== "" ? (
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
                Province
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.province}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.phoneNumber !== "" ? (
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
                Phone Number
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.phoneNumber}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.email !== "" ? (
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
                Email
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.email}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.primaryCaregiver !== "" ? (
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
                Primary Caregiver
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  <Link
                    to={`/cyfms/view/${data.priParticipantId}`}
                    onClick={handlePrimaryCaregiver}
                  >
                    {data.primaryCaregiver}
                  </Link>
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.secondaryCaregiver !== "" ? (
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
                Secondary Caregiver
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  <Link
                    to={`/cyfms/view/${data.secParticipantId}`}
                    onClick={handleSecondaryCaregiver}
                  >
                    {data.secondaryCaregiver}
                  </Link>
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CareProviderViewPage;
