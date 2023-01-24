import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { searchCgAttachments } from "../attachments/service";
import { Data } from "../attachments/AttachmentDataTypes";

/**
 * *CG* aka *Caregivers* module. \
 * Sub page: *View* \
 * Sub sub page: `AttachmentsViewPage` \
 * Displays *attachments* related details.
 */
const AttachmentsViewPage: FC = () => {
  const [data, setData] = useState<Data[]>([
    { id: 0, cgImageId: 0, name: "", type: "", cgImageName: "" },
  ]);
  const { id } = useParams();
  useEffect(() => {
    searchCgAttachments(Number(id)).then(({ data }) => {
      setData(data);
    });
  }, []);

  if (data.length === 0) {
    if (true) {
      return <></>;
    }
  }

  return (
    <>
      {Object.entries(data).map((t: any, index: number) => (
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
                {data[index].name !== "" ? (
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
                        {data[index].name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {data[index].type !== "" ? (
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
                        {data[index].type}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {data[index].cgImageName !== "" ? (
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
                      Attachment
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        <Link
                          download
                          rel="noopener noreferrer"
                          href={`${
                            process.env.REACT_APP_REST_API_TEST ||
                            "http://localhost:9088"
                          }/v1/caregiverservice/attachments/download_one/${
                            data[index].cgImageId
                          }`}
                        >
                          {data[index].cgImageName}
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
        </>
      ))}
    </>
  );
};

export default AttachmentsViewPage;
