import { ContactLabels } from "../../../library/labels/cyfms";
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
import { readContact } from "../contact/contactService";
import type { Contact } from "../contact/contactDatatypes";
import type { FC } from "react";

const ContactViewPage: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<Contact>({
    participantId: Number(id),
    participantContactId: 0,
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    postalCode: "",
    homePhone: "",
    workPhone: "",
    cellPhone: "",
    emailAddress: "",
  });

  useEffect(() => {
    readContact(Number(id)).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="contact data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k: any) => {
            if (
              t[1] !== "" &&
              t[1] !== 0 &&
              ContactLabels[k] !== "ParticipantId" &&
              ContactLabels[k] !== "ParticipantContactId"
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
                    {ContactLabels[k]}
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

export default ContactViewPage;
