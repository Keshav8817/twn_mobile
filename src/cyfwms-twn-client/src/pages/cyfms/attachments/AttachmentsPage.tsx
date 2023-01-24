import AttachmentList from "../../../components/cyfms/attachments/AttachmentList";
import CyfmsLayout from "../../../components/cyfms/CYFMSLayout";
import axiosInstance from "../../../library/axiosInstance";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Attachment } from "./attachmentsDatatypes";
import type { FC } from "react";

/**
 * `AttachmentsPage`
 */
const AttachmentsPage: FC = () => {
  const { id } = useParams();
  const [attachmentsList, setAttachmentsList] = useState<Attachment[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`participantservice/attachments/read_all/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        setAttachmentsList(response.data);
      });
  }, []);

  return (
    <CyfmsLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              component={Link}
              to={`../attachments/add/${id}`}
              variant="contained"
            >
              Add New
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <TableContainer>
              <Table
                sx={{
                  "th, td": { width: "33%", textAlign: "center", p: "0.25rem" },
                }}
              >
                <TableHead
                  sx={{
                    th: {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                >
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Document</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ td: { backgroundColor: grey["400"] } }}>
                  <AttachmentList list={attachmentsList} />
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </CyfmsLayout>
  );
};

export default AttachmentsPage;
