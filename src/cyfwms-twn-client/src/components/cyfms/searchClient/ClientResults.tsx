import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import type { SearchResult } from "../../../pages/cyfms/search/searchDatatypes";
import type { FC } from "react";

const ClientResults: FC<{
  setClick: any;
  moduleName: any;
  searchId: any;
  data: SearchResult[];
  setClientName: any;
  setClientId: any;
}> = (props) => {
  return (
    <Box>
      <Typography fontSize={20} fontWeight={800} color="red" paddingLeft={2}>
        Total Results - {props.data.length}
      </Typography>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reference ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((participant) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() => {
                  props.setClientName(
                    participant.firstname + " " + participant.surname
                  );
                  // props.setClientId(participant.participantId);
                  props.setClick(false);
                }}
              >
                {participant.referenceId}
              </TableCell>
              <TableCell>{participant.firstname}</TableCell>
              <TableCell>{participant.surname}</TableCell>
              <TableCell>{participant.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ClientResults;
