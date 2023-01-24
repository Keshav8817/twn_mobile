import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICLayout from "../../../components/ic/ICLayout";
import TextArea from "../../../components/TextArea";
import { getAllPresentConcerns, postPresentConcerns } from "./services";
import { onKeyDown } from "../../../library/app";
import { Data } from "./PresentConcernDatatypes";
import { Box, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ICInput from "../../../components/ic/Input";
import type { FormEvent, ReactElement } from "react";
import ICMultiSelectDropdown from "../../../components/ic/ICMultiSelectDropdown";
import { getIcrPresentConcernsCodetable } from "../../service/codetableService";
import { getIcMentalHealthOrSubstanceAbuseCodetable } from "../../../services/codetableService";

/**
 * The PresentConcerns functional component.
 * @returns PresentConcerns component skeleton.
 */
const PresentConcerns = (): ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState({
    fileDetailsId: Number(id),
    presentConcernsId: 0,
    selectPresentConcerns: "",
    situation: "",
    substanceAbuse: "",
    explainMentalHealth: "",
  });
  const [presentConcern, setPresentConcerns] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [mentalHealthOrSubstanceAbuse, setmentalHealthOrSubstanceAbuse] =
    useState({});
  const [substanceAbuse, setSubstanceAbuse] = React.useState<string[]>([]);
  const [selectPresentConcerns, setSelectPresentConcerns] = React.useState<
    string[]
  >([]);

  useEffect(() => {
    getIcrPresentConcernsCodetable().then((data) => {
      setPresentConcerns(data.data.valuesMap);
    });
    getIcMentalHealthOrSubstanceAbuseCodetable().then((data) => {
      setmentalHealthOrSubstanceAbuse(data.data.valuesMap);
    });
    getAllPresentConcerns(Number(id)).then(({ data }) => {
      setState(data);
      setSelectPresentConcerns(
        JSON.parse(data.selectPresentConcerns.replace(/\n/, ""))
      );
      setSubstanceAbuse(JSON.parse(data.substanceAbuse.replace(/\n/, "")));
      if (data.presentConcernsId !== 0) {
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
      presentConcernsId: state.presentConcernsId,
      selectPresentConcerns: JSON.stringify(selectPresentConcerns),
      situation: form.situation.value,
      substanceAbuse: JSON.stringify(substanceAbuse),
      explainMentalHealth: form.explainMentalHealth.value,
    };
    postPresentConcerns(formData).then(() => {
      localStorage.setItem(
        "EditMode",
        JSON.stringify({ view: true, edit: false })
      );
      navigate(`../patient_care_information/${id}`);
    });
  };
  const handleChange = (
    event: SelectChangeEvent<typeof selectPresentConcerns>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectPresentConcerns(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange1 = (event: SelectChangeEvent<typeof substanceAbuse>) => {
    const {
      target: { value },
    } = event;
    setSubstanceAbuse(typeof value === "string" ? value.split(",") : value);
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
                  <ICMultiSelectDropdown
                    readOnly={disabled}
                    value={selectPresentConcerns}
                    onChange={handleChange}
                    id="selectPresentConcerns"
                    label="Please Select Present Concerns"
                    optionsList={Object.values(presentConcern).map(
                      (substance: any) => substance.en
                    )}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <TextArea
                formLabelFlex="0.82 1 0"
                outlinedInputFlex="5.3 1 0"
                autofill={state.situation}
                id="situation"
                value="Briefly Explain Situation"
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
                  <ICMultiSelectDropdown
                    readOnly={disabled}
                    id="substanceAbuse"
                    value={substanceAbuse}
                    onChange={handleChange1}
                    label="Mental Health or Alcohol / Substance Abuse"
                    optionsList={Object.values(
                      mentalHealthOrSubstanceAbuse
                    ).map((substance: any) => substance.en)}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <TextArea
                formLabelFlex="0.82 1 0"
                outlinedInputFlex="5.3 1 0"
                autofill={state.explainMentalHealth}
                id="explainMentalHealth"
                value="Briefly Explain"
              />
            </Box>
          </Box>
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            ></Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </ICLayout>
  );
};

export default PresentConcerns;
