import { CounselorLabels } from "../../../library/labels/cyfms";
import { readCounselors } from "../counselors/counselorsService";
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
import type { Counselor } from "../counselors/counselorsDatatypes";
import type { FC } from "react";

const Councelors: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<Counselor[]>([
    {
      participantId: Number(id),
      counselorCFSWorkerId: 0,
      role: "",
      name: "",
      startDate: "",
      endDate: "",
      contactInformation: "",
    },
  ]);

  useEffect(() => {
    readCounselors(Number(id)).then((response) => {
      setData(response.data);
    });
  }, []);

  if (data.length > 0) {
    if (
      data[0].role === "" &&
      data[0].name === "" &&
      data[0].startDate !== "0001-01-01" &&
      data[0].endDate !== "0001-01-01" &&
      data[0].contactInformation === ""
    ) {
      return <></>;
    }
  }

  return (
    <>
      {Object.entries(data).map((t: any, index: number) => (
        <>
          <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
            Counselor: {index + 1}
          </Typography>

          <TableContainer
            sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
          >
            <Table
              sx={{ maxWidth: 900 }}
              aria-label="counselor or CFS worker data table"
            >
              <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                {Object.entries(data[index]).map((t: any, k: any) => {
                  if (
                    t[1] !== "" &&
                    t[1] !== 0 &&
                    CounselorLabels[k] !== "ParticipantId" &&
                    CounselorLabels[k] !== "CounselorCFSWorkerId"
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
                          {CounselorLabels[k]}
                        </TableCell>
                        <TableCell width="50%">
                          <Typography
                            component="p"
                            sx={{ whiteSpace: "pre-wrap" }}
                          >
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
        </>
      ))}
    </>
  );
};

export default Councelors;
