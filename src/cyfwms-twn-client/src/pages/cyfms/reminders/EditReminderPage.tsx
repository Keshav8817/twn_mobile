import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import EditIcon from "../../../components/cyfms/reminders/EditIcon";
import { onKeyDown } from "../../../library/app";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC, FormEvent, FormEventHandler } from "react";
import SearchClientName from "../../../components/cyfms/searchClient/SearchClientName";
import { Reminder } from "./remindersDatatypes";
import { getHrReminder, postHrReminder } from "./remindersService";
import { useNavigate, useParams } from "react-router";
import {
  getFrequencyCodetable,
  getRemindersStatusCodetable,
} from "../../../services/codetableService";

import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import { readIdentity } from "../register/registerService";

const EditReminderPage: FC<any> = ({ setAddNew, targetValue }) => {
  const navigate = useNavigate();
  const { id, childId } = useParams();
  const [click, setClick] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState({
    participantReminderId: 0,
    participantId: Number(id),
    referenceId: 0,
    reminderDto: {
      reminderId: 0,
      assignedTo: "",
      regarding: "",
      subject: "",
      status: "",
      reminderDate: "",
      endDate: "",
      description: "",
      frequency: "",
    },
  });
  const [status, setStatus] = useState({});
  const [frequency, setFrequency] = useState({});
  const [clientName, setClientName] = useState("");
  const [referenceId, setReferenceId] = useState(0);
  const [clientID, setClientId] = useState();

  useEffect(() => {
    getRemindersStatusCodetable().then((data) => {
      setStatus(data.data.valuesMap);
    });
    getFrequencyCodetable().then((data) => {
      setFrequency(data.data.valuesMap);
    });
    readIdentity(Number(id)).then((response) => {
      setReferenceId(response.data.referenceId);
    });
    getHrReminder(Number(childId)).then((response) => {
      setState(response.data);
      setClientId(response.data.reminderDto.participantId);
      setClientName(response.data.reminderDto.regarding);
    });
  }, []);

  const handleSearch = () => {
    if (!disabled) {
      setClick(true);
    }
  };

  const changeHandler: FormEventHandler<HTMLFormElement> = (event) => {
    const form = event.currentTarget as HTMLFormElement;
    const formData: Reminder = {
      participantReminderId: Number(childId),
      participantId: Number(id),
      referenceId: 0,
      reminderDto: {
        reminderId: 0,
        assignedTo: form.assignedTo.value,
        regarding: 0,
        subject: form.subject.value,
        status: form.status.value,
        reminderDate: form.reminderDate.value,
        endDate: form.endDate.value,
        description: form.description.value,
        frequency: form.frequency.value,
      },
    };
    setState(formData);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Reminder = {
        participantReminderId: Number(childId),
        participantId: Number(id),
        referenceId: state.referenceId,
        reminderDto: {
          reminderId: state.reminderDto.reminderId,
          assignedTo: form.assignedTo.value,
          regarding: clientID,
          subject: form.subject.value,
          status: form.status.value,
          reminderDate: form.reminderDate.value,
          endDate: form.endDate.value,
          description: form.description.value,
          frequency: form.frequency.value,
        },
      };
      postHrReminder(formData).then(() => {
        navigate(`../reminder/${id}`);
      });
    }
  };

  return (
    <>
      <CYFMSLayout>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem 0",
          }}
          onChange={changeHandler}
          onSubmit={submitHandler}
          onKeyDown={onKeyDown}
        >
          {disabled && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <EditIcon
                setDisabled={setDisabled}
                participantReminderId={state.participantReminderId}
              />
            </Box>
          )}
          <Typography variant="body1">
            <b>Task information</b>
          </Typography>
          {disabled && (
            <Typography sx={{ p: 1 }}>Reference ID: {referenceId}</Typography>
          )}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Input
                id="reminderDate"
                value="Reminder Date"
                type="date"
                required
                autofill={state.reminderDto.reminderDate}
                readOnly={disabled}
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Input
                id="assignedTo"
                value="Assigned To"
                autofill={state.reminderDto.assignedTo}
                readOnly={disabled}
              />
            </Box>
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
                  Regarding
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
                  style={{ backgroundColor: "#dfdada" }}
                  endAdornment={<SearchIcon onClick={handleSearch} />}
                  //   required
                />
              </FormControl>
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Input
                id="subject"
                value="Subject"
                autofill={state.reminderDto.subject}
                readOnly={disabled}
                required
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Dropdown
                id="status"
                value="Status"
                autofill={state.reminderDto.status}
                readOnly={disabled}
                required
                optionsList={Object.values(status).map(
                  (status: any) => status.en
                )}
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
          </Box>
          <TextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5.3 1 0"
            id="description"
            value="Description"
            autofill={state.reminderDto.description}
            readOnly={disabled}
          />
          <h4>Recurrance</h4>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Dropdown
                id="frequency"
                value="Frequency"
                autofill={state.reminderDto.frequency}
                readOnly={disabled}
                optionsList={Object.values(frequency).map(
                  (status: any) => status.en
                )}
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Input
                id="endDate"
                value="End Date"
                type="date"
                autofill={state.reminderDto.endDate}
                readOnly={disabled}
              />
            </Box>
            {click && (
              <SearchClientName
                click={click}
                setClick={setClick}
                moduleName="initialcontactreminder"
                searchId="icReminderId"
                setClientName={setClientName}
                setClientId={setClientId}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <CYFSWMSNextButton disabled={disabled} />
          </Box>
        </Box>
      </CYFMSLayout>
    </>
  );
};

export default EditReminderPage;
