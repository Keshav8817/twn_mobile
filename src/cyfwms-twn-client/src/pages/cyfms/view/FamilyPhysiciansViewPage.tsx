import { FamilyPhysicianLabels } from "../../../library/labels/cyfms";
import { readFamilyPhysicians } from "../familyPhysicians/familyPhysiciansService";
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
import type { FamilyPhysician } from "../familyPhysicians/familyPhysiciansDatatypes";
import type { FC } from "react";

const FamilyPhysiciansViewPage: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<FamilyPhysician[]>([
    {
      participantId: Number(id),
      familyPhysicianId: 0,
      name: "",
      phone: "",
      cell: "",
      listOfMedication: "",
    },
  ]);

  useEffect(() => {
    readFamilyPhysicians(Number(id)).then((response) => {
      setData(response.data);
    });
  }, []);

  if (data.length > 0) {
    if (
      data[0].name === "" &&
      data[0].phone === "" &&
      data[0].cell === "" &&
      data[0].listOfMedication === ""
    ) {
      return <></>;
    }
  }

  return (
    <>
      {Object.entries(data).map((t: any, index: number) => (
        <>
          <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
            Family Physician: {index + 1}
          </Typography>

          <TableContainer
            sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
          >
            <Table
              sx={{ maxWidth: 900 }}
              aria-label="family physician data table"
            >
              <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                {Object.entries(data[index]).map((t: any, k: any) => {
                  if (
                    t[1] !== "" &&
                    t[1] !== 0 &&
                    t[1] !== null &&
                    FamilyPhysicianLabels[k] !== "ParticipantId" &&
                    FamilyPhysicianLabels[k] !== "FamilyPhysicianId"
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
                          {FamilyPhysicianLabels[k]}
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

export default FamilyPhysiciansViewPage;
