import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  OutlinedInput,
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

import { Data } from "./ContactNotesDataType";
// import { getIcrContactMethodsCodetable } from "../../../services/codetableService";
import CgLayout from "../../../components/cg/CgLayout";
import { searchCgContactNotes } from "./ContactNotesService";

/**
 * `IC` aka `Initial Contact` module.
 * Sub page: `Contact Notes`.
 */
const ContactNotes: FC = () => {
  const [value, setValue] = useState("");
  const { id } = useParams();
  const [conactMethod, setContactMethod] = useState();
  const [data, setData] = useState<Data[]>([
    {
      cgContactNotesId: 0,
      cgProviderId: Number(id) | 0,
      name: "",
      worker: "",
      date: "",
      time: "",
      contactMethod: "",
      needAddress: "",
      summary: "",
      result: "",
      nextStep: "",
      casePlanProgress: "",
      additionalInformation: "",
    },
  ]);
  const [state, setState] = useState<Data>({
    cgContactNotesId: 0,

    cgProviderId: Number(id) | 0,
    name: "",
    worker: "",
    date: "",
    time: "",
    contactMethod: "",
    needAddress: "",
    summary: "",
    result: "",
    nextStep: "",
    casePlanProgress: "",
    additionalInformation: "",
  });

  useEffect(() => {
    searchCgContactNotes(Number(id), "").then(({ data }) => {
      setData(data);
    });
  }, []);

  const handleSearchIcon = (e: any) => {
    searchCgContactNotes(state.cgProviderId, value).then(({ data }) => {
      setData(data);
    });
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <CgLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ paddingLeft: "8px", flexBasis: 0, flexGrow: 2 }}>
            <OutlinedInput
              id="search"
              value={value}
              placeholder="search..."
              size="small"
              onChange={(e) => handleChange(e)}
              sx={{ borderRadius: 0, flexBasis: 0, flexGrow: 2, ml: -1 }}
              type="text"
              endAdornment={<SearchIcon onClick={(e) => handleSearchIcon(e)} />}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setValue("");
              }}
            >
              Clear Search
            </Button>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 2 }}></Box>

          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              component={Link}
              to={`../contact_notes/add/${id}`}
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
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    ></TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      Worker
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
                  {data.map((val: Data) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        <Link
                          to={`../contact_notes/edit/${val.cgProviderId}/${val.cgContactNotesId}`}
                        >
                          Select
                        </Link>
                      </TableCell>
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {val.date}
                      </TableCell>
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {val.name}
                      </TableCell>
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {val.worker}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </CgLayout>
  );
};

export default ContactNotes;
