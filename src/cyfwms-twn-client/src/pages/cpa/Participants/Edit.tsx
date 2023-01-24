import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";

import { onKeyDown } from "../../../library/app";
import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC, FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { readParticiapnts, saveParticiapnts } from "./Service";
import CpaLayout from "../../../components/cpa/CPALayout";

import { Data } from "./ParticipantsDatatypes";
import EditIcon from "../../../components/cpa/participants/EditIcon";
import ICInput from "../../../components/cpa/Input";
import SearchClientName from "../../../components/ic/searchClient/SearchClientName";

const Edit: FC<any> = ({ setAddNew }) => {
  const { id, childId } = useParams();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientID, setClientId] = useState();
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState<Data>({
    participantCulturalProId: 0,
    culturalProgramId: Number(id),
    participant: 0,
    role: "",
    notes: "",
  });

  useEffect(() => {
    readParticiapnts(Number(childId)).then(({ data }) => {
      setState(data);
      setClientName(data.participant);
      setClientId(data.participantId);
    });
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Data = {
        participantCulturalProId: Number(childId),
        culturalProgramId: Number(id),
        participant: clientID,
        role: ((form as any).role as any).value as any,
        notes: form.notes.value,
      };
      saveParticiapnts(formData).then(() => {
        navigate(`/cpa/participants/${id}`);
      });
    }
  };

  const handleSearch = () => {
    if (!disabled) {
      setClick(true);
    }
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <EditIcon setDisabled={setDisabled} cpaParticipantId={id} />
          {/* <EditIcon
            setDemo={setDisabled}
            setAddNew={setAddNew}
            icParticipantId={id}
          /> */}
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
                  borderRadius: 0,
                  flexBasis: 0,
                  flexGrow: 2,
                }}
                size="small"
                readOnly={disabled}
                value={clientName}
                // value={state.participant}
                style={{ backgroundColor: "#dfdada" }}
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
              type="text"
              autofill={state.role}
              readOnly={disabled}
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

export { Edit as ParticipantEdit };
