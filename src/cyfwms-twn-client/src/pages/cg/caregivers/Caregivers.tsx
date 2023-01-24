import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import CgLayout from "../../../components/cg/CgLayout";
import CYFMSDropdown from "../../../components/Dropdown";
import TextArea from "../../../components/TextArea";
import { onKeyDown } from "../../../library/app";

import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { FC, FormEvent } from "react";
import { Data } from "./CaregiverDataType";
import { getCgBgCheckStatusCodetable } from "../../../services/codetableService";
import { readCareGivers, saveCareGivers } from "./CaregiverService";
import { PopupDispatchContext } from "../../../contexts/PopupContext";

/**
 * `CG` aka `Caregivers` module.
 * Sub page: `Caregivers`.
 * @returns `ReactElement`
 */
const Caregivers: FC = () => {
  const navigate = useNavigate();
  const [cgBgCheckStatus, setCgBgCheckStatus] = useState({});
  const { id } = useParams();
  const popupDispatchContext = useContext(PopupDispatchContext);
  const [state, setState] = useState<Data>({
    cgProviderId: Number(id),
    cgBackGroundCheckId: 0,
    priBGCheckStatus: "",
    priDate: "",
    priDetails: "",
    priTrainingCompleted: "",
    secBGCheckStatus: "",
    secDate: "",
    secDetails: "",
    secTrainingCompleted: "",
  });
  useEffect(() => {
    getCgBgCheckStatusCodetable().then((response) => {
      setCgBgCheckStatus(response.data.valuesMap);
    });
    readCareGivers(Number(id)).then(({ data }) => {
      setState(data);
    });
  }, []);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      cgProviderId: Number(id),
      cgBackGroundCheckId: state.cgBackGroundCheckId | 0,
      priBGCheckStatus: form.priBgCheckStatus.value,
      priDate: form.priDate.value,
      priDetails: form.priDetails.value,
      priTrainingCompleted: form.priTrainingsCompleted.value,
      secBGCheckStatus: form.secBgCheckStatus.value,
      secDate: form.secDate.value,
      secDetails: form.secDetails.value,
      secTrainingCompleted: form.secTrainingsCompleted.value,
    };
    saveCareGivers(formData)
      .then((res) => {
        popupDispatchContext({ type: "open", open: false });
        navigate(`/cg/view/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CgLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
          "> div": { display: "flex", gap: "0 1rem" },
          "> div > div": { flex: "1 1 0" },
        }}
        onSubmit={handleSubmit}
        onKeyDown={onKeyDown}
      >
        <Typography variant="body1" color="primary">
          Primary Caregiver
        </Typography>
        <div>
          <div>
            <CYFMSDropdown
              autofill={state.priBGCheckStatus}
              id="priBgCheckStatus"
              value="Background Check Status"
              optionsList={Object.values(cgBgCheckStatus).map(
                (cgStatus: any) => cgStatus.en
              )}
            />
          </div>
          <div>
            <Input
              autofill={state.priDate}
              id="priDate"
              type="date"
              value="Date"
            />
          </div>
        </div>
        <div>
          <TextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5.3 1 0"
            autofill={state.priDetails}
            id="priDetails"
            value="Details"
          />
        </div>
        <div>
          <TextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5.3 1 0"
            autofill={state.priTrainingCompleted}
            id="priTrainingsCompleted"
            value="Training(s) Completed"
          />
        </div>
        <Typography variant="body1" color="primary">
          Secondary Caregiver
        </Typography>
        <div>
          <div>
            <CYFMSDropdown
              autofill={state.secBGCheckStatus}
              id="secBgCheckStatus"
              value="Background Check Status"
              optionsList={Object.values(cgBgCheckStatus).map(
                (cgStatus: any) => cgStatus.en
              )}
            />
          </div>
          <div>
            <Input
              autofill={state.secDate}
              id="secDate"
              type="date"
              value="Date"
            />
          </div>
        </div>
        <div>
          <TextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5.3 1 0"
            autofill={state.secDetails}
            id="secDetails"
            value="Details"
          />
        </div>
        <div>
          <TextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5.3 1 0"
            autofill={state.secTrainingCompleted}
            id="secTrainingsCompleted"
            value="Training(s) Completed"
          />
        </div>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </CgLayout>
  );
};

export default Caregivers;
