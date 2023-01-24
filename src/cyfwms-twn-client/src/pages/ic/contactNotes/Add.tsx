import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import EditIcon from "../../../components/ic/contactNotes/EditIcon";

import { onKeyDown } from "../../../library/app";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC, FormEvent } from "react";
import IcLayout from "../../../components/ic/ICLayout";
import { Data } from "./ContactNotesDataType";
import { postICContactNotes } from "./service";
import { useNavigate, useParams } from "react-router";
import ICInput from "../../../components/ic/Input";
// import { getIcrContactMethodsCodetable } from "../../../services/codetableService";
import { getIcContactMethodsCodetable } from "../../../services/codetableService";
const Add: FC<any> = ({ setAddNew, setDisabled, disabled, targetValue }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contactMethod, setContactMethod] = useState({});
  // const state = useAppSelector((state) => state.icFileDetails);
  // const { contactMethod } = useAppSelector((state) => state.codetable);
  // const data = useAppSelector((state) => state.icContactNotes.data);
  const [state, setState] = useState<Data>({
    fileDetailsId: Number(id),
    contactNotesId: 0,
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
      fileDetailsId: Number(id),
      contactNotesId: state.contactNotesId || 0,
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
    postICContactNotes(formData).then(() => {
      navigate(`../contact_notes/${id}`);
    });
    // dispatch(doPost(formData))
    //   .unwrap()
    //   .then(() => {
    //     console.log("IcContactNotes POST backend API was successful!");
    //     dispatch(doSearch({ id: state.getData.fileDetailsId, data: "" }));
    //     setAddNew(false);
    //   })
    //   .catch((err) => {
    //     console.log("IcContactNotes POST backend API didn't work!");
    //     console.log(err);
    //   });
  };
  return (
    <IcLayout>
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
            <ICInput id="naam" value={"Name"} required />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="worker" value="Worker" required />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="date"
              value="Date"
              type="date"
              required
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="time" value="Time" type="time" />
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
              // optionsList={["a", "b", "c"]}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="address"
          value="Need(s) Addressed"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="summary"
          value="Summary"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="result"
          value="Results"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="nextStep"
          value="Next Step(s)"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="progress"
          value="Progress towards Case Plan"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          id="information"
          value="Additional Information"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </IcLayout>
  );
};

export { Add as IcContactNotesAdd };
