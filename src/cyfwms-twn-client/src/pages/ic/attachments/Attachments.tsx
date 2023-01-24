import AttachmentList from "../../../components/ic/attachments/AttachmentList";
import IcLayout from "../../../components/ic/ICLayout";
// import { doGet } from "../../../features/initialContact/attachments/slice";
// import { useAppDispatch, useAppSelector } from "../../../library/hooks";
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
import type { FC } from "react";
import { Attachment } from "./AttachmentDataTypes";
import { searchICAttachments } from "./service";
import axiosInstance from "../../../library/axiosInstance";

/**
 * `IC` aka `Initial Contact` module.
 * Sub page: `Attachments`.
 * @returns `ReactElement`
 */
const Attachments: FC = () => {
  const { id } = useParams();
  const [attachmentsList, setAttachmentsList] = useState<Attachment[]>([]);
  const [data, setData] = useState<Attachment[]>([
    {
      fileDetailsId: Number(id),
      icAttachmentId: 0,
      icAttachmentName: "",
      name: "",
      type: "",
    },
  ]);
  const [state, setState] = useState<Attachment>({
    fileDetailsId: Number(id),
    icAttachmentId: 0,
    icAttachmentName: "",
    name: "",
    type: "",
  });
  useEffect(() => {
    // axiosInstance
    //   .get(`initialcontactservice/attachments/read_all/${Number(id)}`, {
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    //     },
    //   })
    //   .then((response) => {
    //     setAttachmentsList(response.data);
    //   });
    searchICAttachments(Number(id)).then(({ data }) => {
      setData(data);
    });
  }, []);

  return (
    <IcLayout>
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
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
              }}
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
              <Table sx={{ minWidth: 760 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "white",
                    }}
                  >
                    <TableCell
                      align="center"
                      size="small"
                      sx={{ color: "white" }}
                    ></TableCell>
                    <TableCell
                      align="center"
                      size="small"
                      sx={{ color: "white" }}
                    >
                      Document
                    </TableCell>
                    <TableCell
                      align="center"
                      size="small"
                      sx={{ color: "white" }}
                    >
                      Type
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
                  <AttachmentList list={data} />
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </IcLayout>
  );
};

export default Attachments;
