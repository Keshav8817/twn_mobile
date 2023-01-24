import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as L, useParams } from "react-router-dom";
import { FC } from "react";
import { searchICAttachments } from "../../../pages/ic/attachments/service";
import { Attachment } from "../attachments/AttachmentsDatatypes";
import { searchCPAAttachments } from "../attachments/service";

const AttachmentsViewPage: FC = (props: any) => {
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
  useEffect(() => {
    searchCPAAttachments(Number(id)).then(({ data }) => {
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
                {data[index].culturalimagename !== "" ? (
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
                        {/* <Link component={L} to="/demo"> */}
                        <Link
                          download
                          rel="noopener noreferrer"
                          href={`${
                            process.env.REACT_APP_REST_API_TEST ||
                            "http://localhost:9088"
                          }/v1/cpa/attachments/download_one/${
                            data[index].culturalProgImageId
                          }`}
                        >
                          {data[index].culturalimagename}
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
