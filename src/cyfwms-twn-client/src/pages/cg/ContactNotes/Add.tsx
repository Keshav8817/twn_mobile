import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
// import EditIcon from "../../../components/initialContact/contactNotes/EditIcon";

import { onKeyDown } from "../../../library/app";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC, FormEvent } from "react";

import { Data } from "./ContactNotesDataType";

import { useNavigate, useParams } from "react-router";

// import { getIcrContactMethodsCodetable } from "../../../services/codetableService";
import CgLayout from "../../../components/cg/CgLayout";
import { saveCgContactNotes } from "./ContactNotesService";

import { getIcContactMethodsCodetable } from "../../../services/codetableService";
import EditIcon from "../../../components/cg/contactNotes/EditIcon";

const Add: FC<any> = ({ setAddNew, setDisabled, disabled, targetValue }) => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [contactMethod, setContactMethod] = useState({});

  const [state, setState] = useState<Data>({
    cgContactNotesId: 0,
    cgProviderId: Number(id),
    name: "",
    worker: "",
    date: "",
    time: "",
    contactMethod: "",
    needAddress: "",
    summary: "",
    result: "",
    nextStep: "",
    casePlanProgress: "",
    additionalInformation: "",
  });

  useEffect(() => {
    getIcContactMethodsCodetable().then((data) => {
      setContactMethod(data.data.valuesMap);
    });
  }, []);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData: Data = {
      cgContactNotesId: state.cgContactNotesId || 0,
      cgProviderId: Number(id),
      name: form.naam.value,
      worker: form.worker.value,
      date: form.date.value,
      time: form.time.value,
      contactMethod: form.contactMethod.value,
      needAddress: form.address.value,
      summary: form.summary.value,
      result: form.result.value,
      nextStep: form.nextStep.value,
      casePlanProgress: form.progress.value,
      additionalInformation: form.information.value,
    };
    saveCgContactNotes(formData).then(() => {
      navigate(`/cg/contact_notes/${id}`);
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
        }}
        onSubmit={submitHandler}
        onKeyDown={onKeyDown}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        ></Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input autofill={state.name} id="naam" value={"Name"} required />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.worker}
              id="worker"
              value="Worker"
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="date"
              value="Date"
              type="date"
              autofill={state.date}
              required
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input autofill={state.time} id="time" value="Time" type="time" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="contactMethod"
              value="Contact Method"
              autofill={""}
              optionsList={Object.values(contactMethod).map(
                (status: any) => status.en
              )}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="address"
          autofill={state.needAddress}
          value="Need(s) Addressed"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="summary"
          autofill={state.summary}
          value="Summary"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={state.result}
          id="result"
          value="Results"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="nextStep"
          autofill={state.nextStep}
          value="Next Step(s)"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="progress"
          autofill={state.casePlanProgress}
          value="Progress towards Case Plan"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofil={state.additionalInformation}
          id="information"
          value="Additional Information"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CgLayout>
  );
};

export { Add as IcContactNotesAdd };
