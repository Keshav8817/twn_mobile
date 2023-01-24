import EditIcon from "../EditIcon";
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
import { Link } from "react-router-dom";
import type { SearchResult } from "../../../pages/cyfms/search/searchDatatypes";
import type { FC } from "react";

/**
 * `SearchResults`
 * @param props
 */
const SearchResults: FC<{ data: SearchResult[] }> = (props) => {
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
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((participant: SearchResult) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link to={`/cyfms/view/${participant.participantId}`}>
                  {participant.referenceId}
                </Link>
              </TableCell>
              <TableCell>{participant.firstname}</TableCell>
              <TableCell>{participant.middleName}</TableCell>
              <TableCell>{participant.surname}</TableCell>
              <TableCell>{participant.dateOfBirth}</TableCell>
              <TableCell>{participant.city}</TableCell>
              <TableCell>{participant.workPhone}</TableCell>
              <TableCell>
                <EditIcon
                  value={participant.participantId}
                  referenceID={participant.referenceId || 0}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SearchResults;
