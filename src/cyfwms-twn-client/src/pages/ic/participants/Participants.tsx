import IcLayout from "../../../components/ic/ICLayout";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { FC } from "react";
import { getICParticipant, searchICParticipant } from "./service";
import { Data } from "./ParticipantDataType";

/**
 * `CPA` aka `Initial Contact` module.
 * Sub page: `Participants`.
 * @returns `ReactElement`
 */
const Participants: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.icParticipants.record);
  // const state = useAppSelector((state) => state.icFileDetails.getData);
  const [data, setData] = useState<Data[]>([
    {
      icParticipantId: 0,
      fileDetailsId: Number(id),
      participant: null,
      role: "",
      notes: "",
    },
  ]);
  const [state, setState] = useState<Data>({
    icParticipantId: 0,
    fileDetailsId: Number(id),
    participant: null,
    role: "",
    notes: "",
  });
  const [addNew, setAddNew] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    searchICParticipant(Number(id), "").then(({ data }) => {
      setData(data);
    });
  }, []);

  const handleSelected = (id: number) => {
    getICParticipant(id).then(({ data }) => {
      // setAddNew(true);
      // navigate(`./${id}`);
    });
  };

  return (
    <IcLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
              component={Link}
              to={`../participant/add/${id}`}
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
                      align="center"
                      size="small"
                      sx={{ color: "white" }}
                    ></TableCell>
                    <TableCell
                      align="center"
                      size="small"
                      sx={{ color: "white" }}
                    >
                      Participant
                    </TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      Role
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
                    <TableRow>
                      <TableCell>
                        <Link
                          to={`../participant/edit/${val.fileDetailsId}/${val.icParticipantId}`}
                          onClick={() => handleSelected(val.icParticipantId)}
                        >
                          Select
                        </Link>
                      </TableCell>
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {val.participant}
                      </TableCell>
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {val.role}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </IcLayout>
  );
};

export default Participants;
