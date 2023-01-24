import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import EditIcon from "../../../components/cpa/participants/EditIcon";
import { onKeyDown } from "../../../library/app";
import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC } from "react";

import { useNavigate, useParams } from "react-router";
import { Data } from "./ParticipantsDatatypes";
import { readParticiapnts } from "./Service";
import CPALayout from "../../../components/cpa/CPALayout";
import ICInput from "../../../components/cpa/Input";

const View: FC<any> = ({ setAddNew, setDisabled, disabled }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [state, setState] = useState<Data>({
    participantCulturalProId: 0,
    culturalProgramId: Number(id),
    participant: null,
    role: "",
    notes: "",
  });

  useEffect(() => {
    readParticiapnts(Number(id)).then(({ data }) => {
      setState(data);
    });
  }, []);

  const handleSearch = () => {
    if (!disabled) {
      setClick(true);
    }
  };

  return (
    <CPALayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        //onSubmit={submitHandler}
        //onKeyDown={onKeyDown}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <EditIcon setDisabled={setDisabled} icParticipantId={id} /> */}
          <EditIcon />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <FormLabel
                sx={{ p: 1, flexBasis: 0, flexGrow: 1.06, color: "black" }}
              >
                Participant
              </FormLabel>
              <OutlinedInput
                sx={{
                  borderRadius: 2,
                  flexBasis: 0,
                  flexGrow: 2,
                }}
                size="small"
                disabled={true}
                value={state.participant}
                style={{ backgroundColor: "#ffffff" }}
                endAdornment={<SearchIcon onClick={handleSearch} />}
              />
            </FormControl>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              id="role"
              value="Role"
              autofill={state.role}
              // type="text"
              disabled={true}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="notes"
          value="Notes"
          autofill={state.notes}
          disabled={true}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton disabled={disabled} />
        </Box>
      </Box>
    </CPALayout>
  );
};

export { View as ParticipantView };
