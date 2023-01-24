import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
// import EditIcon from "../../../components/initialContact/reminders/EditIcon";
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

import { Data } from "./ReminderDataType";

import { useNavigate, useParams } from "react-router";
import {
  getFrequencyCodetable,
  getRemindersStatusCodetable,
} from "../../../services/codetableService";

import CgLayout from "../../../components/cg/CgLayout";
import { getCgReminder, postCgReminder } from "./ReminderService";

import EditIcon from "../../../components/cg/reminders/EditIcon";
import SearchClientName from "../../../components/ic/searchClient/SearchClientName";
import { readCareProvider } from "../careProvider/CareProviderService";

const Edit: FC<any> = ({ setAddNew, targetValue }) => {
  const navigate = useNavigate();
  const { id, childId } = useParams();
  const [click, setClick] = useState(false);
  const [referenceID, setReferenceID] = useState();
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState({
    cgReminderId: Number(childId),
    id: Number(id),
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
  const [clientID, setClientId] = useState(0);
  useEffect(() => {
    getRemindersStatusCodetable().then((data) => {
      setStatus(data.data.valuesMap);
    });
    getFrequencyCodetable().then((data) => {
      setFrequency(data.data.valuesMap);
    });
    getCgReminder(Number(childId)).then(({ data }) => {
      setState(data);
      setClientId(data.reminderDto.participantId);
      setClientName(data.reminderDto.regarding);
    });
    readCareProvider(Number(id)).then(({ data }) => {
      setReferenceID(data.referenceId);
    });
  }, []);

  const handleSearch = () => {
    if (!disabled) {
      setClick(true);
    }
  };

  const changeHandler: FormEventHandler<HTMLFormElement> = (event) => {
    const form = event.currentTarget as HTMLFormElement;
    const formData: Data = {
      cgReminderId: Number(childId),
      id: Number(id),
      referenceId: state.referenceId,
      reminderDto: {
        reminderId: state.cgReminderId,
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
    setState(formData);
  };

  useEffect(() => {
    getFrequencyCodetable().then((data) => {
      setFrequency(data.data.valuesMap);
    });
    getRemindersStatusCodetable().then((data) => {
      setStatus(data.data.valuesMap);
    });
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Data = {
        cgReminderId: Number(childId),
        id: Number(id),
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
      postCgReminder(formData).then(() => {
        navigate(`../reminders/${id}`);
      });
    }
  };

  return (
    <>
      <CgLayout>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <EditIcon
              setDisabled={setDisabled}
              icReminderId={state.cgReminderId}
            />
          </Box>
          <Typography variant="body2">Reference ID:{referenceID}</Typography>
          <Typography variant="body1">
            <b>Task information</b>
          </Typography>
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
                  value={clientName}
                  style={{ backgroundColor: "#dfdada" }}
                  endAdornment={<SearchIcon onClick={handleSearch} />}
                  readOnly={disabled}
                  required
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
                disabled={disabled}
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
          <h4>Reccurance</h4>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Dropdown
                id="frequency"
                value="Frequency"
                autofill={state.reminderDto.frequency}
                disabled={disabled}
                required
                optionsList={Object.values(frequency).map(
                  (status: any) => status.en
                )}
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Input
                id="endDate"
                value="End Date"
                required
                type="date"
                autofill={state.reminderDto.endDate}
                readOnly={disabled}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <CYFSWMSNextButton disabled={disabled} />
          </Box>
          {click && (
            <SearchClientName
              click={click}
              setClick={setClick}
              moduleName="initialContact"
              searchId="fileDetails"
              setClientName={setClientName}
              setClientId={setClientId}
            />
          )}
        </Box>
      </CgLayout>
    </>
  );
};

export { Edit as CgReminderEdit };
