import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";

import TextArea from "../../../components/TextArea";
// import EditIcon from "../../../components/initialContact/contactNotes/EditIcon";

import { onKeyDown } from "../../../library/app";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC, FormEvent } from "react";

import { Data } from "./ContactNotesDataType";
import { useNavigate, useParams } from "react-router";
// import Input from "../../../components/initialContact/Input";
// import { getIcrContactMethodsCodetable } from "../../../services/codetableService";
import CgLayout from "../../../components/cg/CgLayout";
import { readCgContactNotes, saveCgContactNotes } from "./ContactNotesService";

import EditIcon from "../../../components/cg/contactNotes/EditIcon";
import { getIcContactMethodsCodetable } from "../../../services/codetableService";
import Input from "../../../components/Input";

const Edit: FC<any> = ({ setAddNew, targetValue }) => {
  // const dispatch = useAppDispatch();

  const { childId, id } = useParams();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState<Data>({
    cgContactNotesId: Number(childId),
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
  const [contactMethod, setContactMethod] = useState({});

  useEffect(() => {
    getIcContactMethodsCodetable().then((data) => {
      setContactMethod(data.data.valuesMap);
    });
    readCgContactNotes(Number(childId)).then(({ data }) => {
      setState(data);
    });
  }, []);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData: Data = {
      cgContactNotesId: Number(childId),
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
        >
          <EditIcon
            setDisabled={setDisabled}
            contactId={state.cgContactNotesId}
          />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="naam"
              value="Name"
              required
              autofill={state.name}
              readOnly={disabled}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="worker"
              value="Worker"
              required
              autofill={state.worker}
              readOnly={disabled}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="date"
              value="Date"
              type="date"
              required
              readOnly={disabled}
              autofill={state.date}
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="time"
              value="Time"
              type="time"
              autofill={state.time}
              readOnly={disabled}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="contactMethod"
              value="Contact Method"
              autofill={state.contactMethod}
              disabled={disabled}
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
          value="Need(s) Addressed"
          autofill={state.needAddress}
          readOnly={disabled}
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="summary"
          value="Summary"
          autofill={state.summary}
          readOnly={disabled}
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="result"
          value="Results"
          autofill={state.result}
          readOnly={disabled}
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="nextStep"
          value="Next Step(s)"
          autofill={state.nextStep}
          readOnly={disabled}
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="progress"
          value="Progress towards Case Plan"
          autofill={state.casePlanProgress}
          readOnly={disabled}
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="information"
          value="Additional Information"
          autofill={state.additionalInformation}
          readOnly={disabled}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton disabled={disabled} />
        </Box>
      </Box>
    </CgLayout>
  );
};

export { Edit as CgContactNotesEdit };
