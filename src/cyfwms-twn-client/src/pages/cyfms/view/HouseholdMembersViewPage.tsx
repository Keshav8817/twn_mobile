import { HouseholdMemberLabels } from "../../../library/labels/cyfms";
import { readHouseholdMembers } from "../householdMembers/householdMembersService";
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
import type { HouseholdMember } from "../householdMembers/householdMembersDatatypes";
import type { FC } from "react";

const HouseholdMembersViewPage: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<HouseholdMember[]>([
    {
      participantId: Number(id),
      householdMemberId: 0,
      name: "",
      gender: "",
      dateOfBirth: "",
      relationship: "",
      residing: "",
    },
  ]);

  useEffect(() => {
    readHouseholdMembers(Number(id)).then((response) => {
      setData(response.data);
    });
  }, []);

  if (data.length > 0) {
    if (
      data[0].name === "" &&
      data[0].dateOfBirth !== "0001-01-01" &&
      data[0].gender === "" &&
      data[0].residing === ""
    ) {
      return <></>;
    }
  }

  return (
    <>
      {Object.entries(data).map((t: any, index: number) => (
        <>
          <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
            Household Member: {index + 1}
          </Typography>

          <TableContainer
            sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
          >
            <Table
              sx={{ maxWidth: 900 }}
              aria-label="household member data table"
            >
              <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                {Object.entries(data[index]).map((t: any, k: any) => {
                  if (
                    t[1] !== "" &&
                    t[1] !== 0 &&
                    HouseholdMemberLabels[k] !== "ParticipantId" &&
                    HouseholdMemberLabels[k] !== "HouseholdMemberId"
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
                          {HouseholdMemberLabels[k]}
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

export default HouseholdMembersViewPage;
