import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import TextArea from "../../../components/TextArea";
import { PopupDispatchContext } from "../../../contexts/PopupContext";
import { TabbarDispatchContext } from "../../../contexts/TabbarContext";
import { onKeyDown } from "../../../library/app";
import {
  readOtherInformation,
  saveOtherInformation,
} from "./otherInformationService";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { OtherInformation } from "./otherInformationDatatypes";
import type { FC } from "react";

/**
 * `OtherInformationPage`
 */
const OtherInformationPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tabbarDispatchContext = useContext(TabbarDispatchContext);
  const popupDispatchContext = useContext(PopupDispatchContext);
  const [state, setState] = useState<OtherInformation>({
    participantId: Number(id),
    participantOtherInfoId: 0,
    strength: "",
    weakness: "",
    skills: "",
    experiences: "",
    effectiveCopingSkills: "",
  });

  useEffect(() => {
    readOtherInformation(Number(id)).then((response) => {
      setState(response.data);
    });
  }, []);

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          const formData: OtherInformation = {
            participantId: Number(id),
            participantOtherInfoId: state.participantOtherInfoId,
            strength: event.currentTarget.strengths.value,
            weakness: event.currentTarget.weaknesses.value,
            skills: event.currentTarget.skills.value,
            experiences: event.currentTarget.experiences.value,
            effectiveCopingSkills:
              event.currentTarget.effectiveCopingSkills.value,
          };
          saveOtherInformation(formData).then(() => {
            navigate(`/cyfms/view/${id}`);
            tabbarDispatchContext({ type: "toggle_hidden", hidden: true });
            popupDispatchContext({ type: "open", open: false });
          });
        }}
        onKeyDown={onKeyDown}
      >
        <Typography variant="body1" color="primary">
          Other Information
        </Typography>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5 1 0"
          autofill={state.strength}
          id="strengths"
          value="Strengths"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5 1 0"
          autofill={state.weakness}
          id="weaknesses"
          value="Weaknesses"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5 1 0"
          autofill={state.skills}
          id="skills"
          value="Skills"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5 1 0"
          autofill={state.experiences}
          id="experiences"
          value="Experiences"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5 1 0"
          autofill={state.effectiveCopingSkills}
          id="effectiveCopingSkills"
          value="Effective Coping Skills"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default OtherInformationPage;
