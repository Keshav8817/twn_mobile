import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import ICLayout from "../../../components/ic/ICLayout";
import TextArea from "../../../components/TextArea";
import ICInput from "../../../components/ic/Input";
import { onKeyDown } from "../../../library/app";
import { getIcRisksCodetable } from "../../../services/codetableService";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Data } from "./IncidentReportDatatypes";
import type { FormEvent, ReactElement } from "react";
import { postIncidentReports, getAllIncidentReports } from "./services";
/**
 * The IncidentReport functional component.
 * @returns IncidentReport component skeleton.
 */
const IncidentReport = (): ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState<Data>({
    fileDetailsId: Number(id),
    incidentReportId: 0,
    dateOfReport: "",
    reportedBy: "",
    partiesInvolved: "",
    witnesses: "",
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    risk: "",
    actionTaken: "",
    actionPlan: "",
  });
  const [risk, setRisk] = useState({});
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    getIcRisksCodetable().then((data) => {
      setRisk(data.data.valuesMap);
    });
    getAllIncidentReports(Number(id)).then(({ data }) => {
      setState(data);
      if (data.incidentReportId !== 0) {
        setDisabled(true);
      }
    });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      fileDetailsId: Number(id),
      incidentReportId: state.incidentReportId,
      dateOfReport: form.incidentReport_DateOfReport.value,
      reportedBy: form.incidentReport_ReportedBy.value,
      partiesInvolved: form.incidentReport_PartiesInvolved.value,
      witnesses: form.incidentReport_Witnesses.value,
      incidentDate: form.incidentReport_IncidentDate.value,
      incidentTime: form.incidentReport_IncidentTime.value,
      incidentLocation: form.incidentReport_IncidentLocation.value,
      risk: form.incidentReport_Risk.value,
      actionTaken: form.incidentReport_ActionTaken.value,
      actionPlan: form.incidentReport_ActionPlan.value,
    };
    postIncidentReports(formData).then(() =>
      navigate(`../present_concerns/${id}`)
    );
  };

  return (
    <ICLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.dateOfReport}
              id="incidentReport_DateOfReport"
              value="Date of Report"
              type="date"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.reportedBy}
              id="incidentReport_ReportedBy"
              value="Reported By"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.partiesInvolved}
              id="incidentReport_PartiesInvolved"
              value="Parties Involved"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.witnesses}
              id="incidentReport_Witnesses"
              value="Witnesses"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.incidentDate}
              id="incidentReport_IncidentDate"
              value="Incident Date"
              type="date"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.incidentTime}
              id="incidentReport_IncidentTime"
              value="Incident Time"
              type="time"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.incidentLocation}
              id="incidentReport_IncidentLocation"
              value="Incident Location"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              autofill={state.risk}
              id="incidentReport_Risk"
              optionsList={Object.values(risk).map((status: any) => status.en)}
              value="Risk"
            />
          </Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={state.actionTaken}
          id="incidentReport_ActionTaken"
          value="Action Taken"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={state.actionPlan}
          id="incidentReport_ActionPlan"
          value="Action Plan"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </ICLayout>
  );
};

export default IncidentReport;
