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
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FC } from "react";
import { Data } from "../../../pages/ic/search/SearchDatatypes";
import { ModuleDispatchContext } from "../../../contexts/ModuleContext";
import { TabbarDispatchContext } from "../../../contexts/TabbarContext";
import { PopupDispatchContext } from "../../../contexts/PopupContext";

const SearchResults: any = ({ record }: any) => {
  const navigate = useNavigate();
  const tabbarDispatchContext = useContext(TabbarDispatchContext);

  const popupDispatchContext = useContext(PopupDispatchContext);
  const moduleDispatchContext = useContext(ModuleDispatchContext);

  return (
    <Box>
      <Typography fontSize={20} fontWeight={800} color="red" paddingLeft={2}>
        Total Results - {record.length}
      </Typography>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Number</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Caseworker</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {record.map((initialContact: Data) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link to={`/ic/view/${initialContact.fileDetailsId}`}>
                  {initialContact.fileNumber}
                </Link>
              </TableCell>
              <TableCell>{initialContact.clientName}</TableCell>
              <TableCell>{initialContact.caseworker}</TableCell>
              <TableCell>{initialContact.startingDate}</TableCell>
              <TableCell>{initialContact.status}</TableCell>
              <TableCell>
                <EditIcon
                  value={initialContact.fileDetailsId}
                  fileNumber={initialContact.fileNumber || 0}
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
