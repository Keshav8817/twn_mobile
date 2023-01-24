import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import { Box, OutlinedInput } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TextArea from "../../../components/TextArea";
import type { FormEvent, ReactElement } from "react";

import { useNavigate, useParams } from "react-router-dom";
import CPALayout from "../../../components/cpa/CPALayout";
import { Data } from "./CulturalProgramAndActivityDataTypes";

import { ModuleDispatchContext } from "../../../contexts/ModuleContext";
import { readCpa, saveCpa } from "./Servcie";
import Input from "../../../components/Input";
import { PopupDispatchContext } from "../../../contexts/PopupContext";
import { TabbarDispatchContext } from "../../../contexts/TabbarContext";
import {
  doGetCPACulturalStatusAPI,
  getCpaTypesCodetable,
} from "../../../services/codetableService";
import ICInput from "../../../components/cpa/Input";

const CulturalProgramOrActivity = () => {
  const navigate = useNavigate();
  const moduleDispatchContext = useContext(ModuleDispatchContext);
  const popupDispatchContext = useContext(PopupDispatchContext);
  const [cpaTypesCodetable, setCpaTypesCodetable] = useState({});
  const [cpaCulturalStatus, setCpaCulturalStatus] = useState({});
  const [click, setClick] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams();
  const tabbarDispatchContext = useContext(TabbarDispatchContext);
  const [state, setState] = useState<Data>({
    culturalProgramId: Number(localStorage.getItem("culturalProgramId")) | 0,
    referenceId: 0,
    name: "",
    type: "",
    status: "",
    caseworker: "",
    startDate: "",
    endDate: "",
    totalCost: "",
    totalParticipation: "",
    sessionDetails: "",
    costOrParticipationDetails: "",
    outcomes: "",
    notes: "",
  });
  useEffect(() => {
    getCpaTypesCodetable().then((response) => {
      setCpaTypesCodetable(response.data.valuesMap);
    });

    doGetCPACulturalStatusAPI().then((response) => {
      setCpaCulturalStatus(response.data.valuesMap);
    });

    readCpa(id ? Number(id) : state.culturalProgramId).then(({ data }) => {
      setState(data);
      if (data.culturalProgramId !== 0) {
        setDisabled(true);
      }
    });
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      culturalProgramId: state.culturalProgramId,
      referenceId: state.referenceId,
      name: form.name.value,
      type: form.type.value,
      status: form.status.value,
      caseworker: form.caseworker.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      totalCost: form.totalCost.value,
      totalParticipation: form.totalParticipation.value,
      sessionDetails: form.sessionDetails.value,
      costOrParticipationDetails: form.costOrParticipationDetails.value,
      outcomes: form.outcomes.value,
      notes: form.notes.value,
    };
    saveCpa(formData).then((res) => {
      localStorage.setItem(
        "culturalProgramId",
        String(res.data.culturalProgramId)
      );
      popupDispatchContext({
        type: "change_id",
        id: res.data.culturalProgramId,
      });
      tabbarDispatchContext({
        type: "toggle_hidden",
        tabsDisabled: false,
      });
      navigate(`/cpa/participants/${res.data.culturalProgramId}`);
    });
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
        onSubmit={submitHandler}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}>
                Reference ID
              </Box>
              <OutlinedInput
                size="small"
                readOnly
                sx={{ borderRadius: 0, flexBasis: 0, flexGrow: 2 }}
                value={state.referenceId}
                style={{ backgroundColor: "#dfdada" }}
              />
            </Box>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              id="name"
              value="Name"
              required
              // readOnly={disabled}
              autofill={state.name}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="type"
              autofill={state.type}
              value="Type"
              readOnly={disabled}
              optionsList={Object.values(cpaTypesCodetable).map(
                (type: any) => type.en
              )}
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="status"
              value="Status"
              readOnly={disabled}
              autofill={state.status}
              optionsList={Object.values(cpaCulturalStatus).map(
                (type: any) => type.en
              )}
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.caseworker}
              id="caseworker"
              value="Caseworker"
              // readOnly={disabled}
              required
              // disabled={editMode}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.startDate}
              id="startDate"
              value="Start Date"
              type="Date"
              readOnly={disabled}
              required
              //disabled={editMode}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              // autofill={state.endDate}
              id="endDate"
              value="End Date"
              readOnly={disabled}
              type="Date"
              //  disabled={editMode}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.totalParticipation}
              id="totalParticipation"
              value="Total Participation"
              //readOnly={disabled}
              //disabled={editMode}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.totalCost}
              id="totalCost"
              value="Total Cost"
              // readOnly={disabled}
              //disabled={editMode}
            />
          </Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={state.sessionDetails}
          id="sessionDetails"
          value="Session Details"
          readOnly={disabled}
          //disabled={editMode}
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={state.costOrParticipationDetails}
          id="costOrParticipationDetails"
          value="Participation / Cost Details"
          readOnly={disabled}
          // disabled={editMode}
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={state.outcomes}
          id="outcomes"
          value="Outcomes"
          readOnly={disabled}
          // disabled={editMode}
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={state.notes}
          id="notes"
          value="Notes"
          readOnly={disabled}
          //disabled={editMode}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <>
            <CYFSWMSSaveButton />
          </>
        </Box>
      </Box>
    </CPALayout>
  );
};

export default CulturalProgramOrActivity;
