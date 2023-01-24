import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import InputNumber from "../../../components/InputNumber";
import CgLayout from "../../../components/cg/CgLayout";
import TextArea from "../../../components/TextArea";
import { onKeyDown } from "../../../library/app";

// import { handleChange, handleEffect, handleSubmit } from "./capacity_";
import { Box } from "@mui/material";
import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { FC } from "react";
import { Data } from "./CapacityDataType";
import { readCapacity, saveCapacity } from "./CapacityService";
import { readCareProvider } from "../careProvider/CareProviderService";

/**
 * `CG` aka `Caregivers` module.
 * Sub page: `Capacity`.
 * @returns `ReactElement`
 */
const Capacity: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const cgCareProviderId = useAppSelector((state) => state.cgCareProvider);
  // const state = useAppSelector((state) => state.cgCapacity);

  const [state, setState] = useState<Data>({
    cgCapacityId: 0,
    cgProviderId: Number(id),
    maximumCap: 0,
    currUtil: 0,
    currUtilDetails: "",
    preferences: "",
  });
  useEffect(() => {
    readCapacity(Number(id)).then(({ data }) => {
      setState(data);
    });
  }, []);

  const handleChange = (event: SyntheticEvent<HTMLFormElement>) => {
    event.currentTarget.availableCapacity.value =
      event.currentTarget.maximumCapacity.value -
      event.currentTarget.currentUtilization.value;
    event.currentTarget.currentUtilization.max =
      event.currentTarget.maximumCapacity.value;
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      cgCapacityId: state.cgCapacityId,
      cgProviderId: Number(id),

      maximumCap: form.maximumCapacity.value,

      currUtil: form.currentUtilization.value,

      currUtilDetails: form.currentUtilizationDetails.value,
      preferences: form.preferences.value,
    };
    console.log(formData);
    saveCapacity(formData)
      .then((res) => {
        navigate(`../caregivers/${id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <CgLayout>
      <Box
        component="form"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
          "> div": { display: "flex", gap: "0 1rem" },
          "> div > div": { flex: "1 1 0" },
        }}
        onChange={(event: any) => handleChange(event)}
        onSubmit={submitHandler}
        onKeyDown={onKeyDown}
      >
        <div>
          <div>
            <InputNumber
              id="maximumCapacity"
              value="Maximum Capacity"
              autofill={state.maximumCap}
              min={0}
            />
          </div>
          <div>
            <InputNumber
              id="currentUtilization"
              value="Current Utilization"
              autofill={state.currUtil}
              min={0}
            />
          </div>
        </div>
        <div>
          <div>
            <InputNumber
              id="availableCapacity"
              value="Available Capacity"
              autofill={state.maximumCap - state.currUtil}
              min={0}
            />
          </div>
          <div></div>
        </div>
        <div>
          <TextArea
            autofill={state.currUtilDetails}
            formLabelFlex="1 1 0"
            outlinedInputFlex="5.3 1 0"
            id="currentUtilizationDetails"
            value="Current Utilization Details"
          />
        </div>
        <div>
          <TextArea
            autofill={state.preferences}
            formLabelFlex="1 1 0"
            outlinedInputFlex="5.3 1 0"
            id="preferences"
            value="Please Specify your Preferences"
          />
        </div>
        <Box sx={{ justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CgLayout>
  );
};

export default Capacity;
