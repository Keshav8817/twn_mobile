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

import { Link, useNavigate, useParams } from "react-router-dom";

import type { FC } from "react";

import { ModuleDispatchContext } from "../../../contexts/ModuleContext";
import { Search } from "../../../pages/cg/search/SearchDataType";
import { TabbarDispatchContext } from "../../../contexts/TabbarContext";
import EditIcon from "../EditIcon";

const SearchResults: any = ({ record }: any) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const moduleDispatchContext = useContext(ModuleDispatchContext);
  const tabbarDispatchContext = useContext(TabbarDispatchContext);

  return (
    <Box>
      <Typography fontSize={20} fontWeight={800} color="red" paddingLeft={2}>
        Total Results - {record.length}
      </Typography>

      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reference Id</TableCell>

            <TableCell>Name</TableCell>

            <TableCell>Type</TableCell>

            <TableCell>Status</TableCell>

            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {record.map((record: Search) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link
                  to={`../view/${record.cgProviderId}`}
                  onClick={() => {
                    localStorage.setItem(
                      "fhFiledetailsId",

                      String(record.name)
                    );
                    tabbarDispatchContext({
                      type: "toggle_hidden",
                      hidden: false,
                    });
                  }}
                >
                  {record.referenceId}
                </Link>
              </TableCell>

              <TableCell>{record.name}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>
                <EditIcon
                  value={record.cgProviderId}
                  referenceId={record.referenceId || 0}
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
