import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";

import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import type { FC, FormEvent } from "react";

import { useNavigate, useParams } from "react-router";
import { Data } from "./ParticipantsDatatypes";
import CpaLayout from "../../../components/cpa/CPALayout";
import { saveParticiapnts } from "./Service";
import SearchClientName from "../../../components/ic/searchClient/SearchClientName";

const Add: FC<any> = ({ setAddNew, setDisabled, disabled }) => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState(" ");
  const [clientID, setClientId] = useState(0);
  const { id } = useParams();

  const [click, setClick] = useState(false);
  const [state, setState] = useState<Data>({
    participantCulturalProId: 0,
    culturalProgramId: Number(id),
    participant: null,
    role: "",
    notes: "",
  });

  console.log("taat: ", id);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Data = {
        participantCulturalProId: state.participantCulturalProId || 0,
        culturalProgramId: Number(id),
        participant: clientID,
        role: ((form as any).role as any).value as any,
        notes: form.notes.value,
      };
      saveParticiapnts(formData).then(() => {
        navigate(`../participants/${id}`);
      });
    }
  };

  const handleSearch = () => {
    setClick(true);
  };

  return (
    <CpaLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        //onKeyDown={onKeyDown}
      >
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
                  borderRadius: 0,
                  flexBasis: 0,
                  flexGrow: 2,
                }}
                value={clientName}
                size="small"
                style={{ backgroundColor: "#dfdada" }}
                endAdornment={<SearchIcon onClick={handleSearch} />}
              />
            </FormControl>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="role" value="Role" type="text" autofill={state.role} />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="notes"
          value="Notes"
          autofill={state.notes}
          readOnly={disabled}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton disabled={disabled} />
        </Box>
        {click && (
          <SearchClientName
            click={click}
            setClick={setClick}
            moduleName="cpaParticipant"
            searchId="cpa"
            setClientName={setClientName}
            setClientId={setClientId}
          />
        )}
      </Box>
    </CpaLayout>
  );
};

export { Add as ParticipantAdd };
