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
import { searchCPAAttachments } from "./service";
import CPALayout from "../../../components/cpa/CPALayout";
import AttachmentList from "../../../components/cpa/attachments/AttachmentList";
import { Attachment } from "./AttachmentsDatatypes";

/**
 * `CPA` aka `Cultural Program And Activity` module.
 * Sub page: `Attachments`.
 * @returns `ReactElement`
 */
const Attachments: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<Attachment[]>([
    {
      culturalProgramId: 0,
      culturalProgImageId: 0,
      culturalimagename: "",
      name: "",
      type: "",
    },
  ]);
  const [state, setState] = useState<Attachment>({
    culturalProgramId: Number(id),
    culturalProgImageId: 0,
    culturalimagename: "",
    name: "",
    type: "",
  });
  useEffect(() => {
    searchCPAAttachments(Number(id)).then(({ data }) => {
      setData(data);
    });
  }, []);

  return (
    <CPALayout>
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
    </CPALayout>
  );
};

export default Attachments;
