import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";

import { onKeyDown } from "../../../library/app";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC, FormEvent } from "react";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import SearchClientName from "../../../components/ic/searchClient/SearchClientName";
import { getAppointments, postAppointments } from "./appointmentsService";
import { Navigate, useNavigate, useParams } from "react-router";
import { Appointment } from "./appointmentsDatatypes";
import {
  getAppointmentsStatusCodetable,
  getFrequencyCodetable,
  getIcReferralCodetable,
} from "../../../services/codetableService";
import EditIcon from "../../../components/cyfms/appointments/EditIcon";
import { readIdentity } from "../register/registerService";

const EditAppointmentPage: FC<any> = ({ setAddNew, targetValue }) => {
  const navigate = useNavigate();
  const { id, childId } = useParams();
  const [disabledField, setDisabledField] = useState<boolean>(false);
  const [click, setClick] = useState(false);
  const [status, setStatus] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [frequency, setFrequency] = useState({});
  const [recurring, setRecurring] = useState({});
  const [referenceId, setReferenceId] = useState(0);
  const [clientName, setClientName] = useState("");
  const [clientID, setClientId] = useState();
  const [state, setState] = useState({
    participantAppointmentId: Number(childId),
    participantId: Number(id),
    referenceId: 0,
    appointmentdto: {
      appointmentId: 0,
      subject: "",
      status: "",
      date: "",
      time: "",
      location: "",
      duration: "",
      client: "",
      caseworker: "",
      recurringAppointment: "",
      frequency: "",
      endDate: "",
      notes: "",
    },
  });

  useEffect(() => {
    getIcReferralCodetable().then((data) => {
      setRecurring(data.data.valuesMap);
    });
    getFrequencyCodetable().then((data) => {
      setFrequency(data.data.valuesMap);
    });
    getAppointmentsStatusCodetable().then((data) => {
      setStatus(data.data.valuesMap);
    });
    getAppointments(Number(childId)).then((response) => {
      setState(response.data);
      setClientId(response.data.appointmentdto.participantId);
      setClientName(response.data.appointmentdto.client);
    });
    readIdentity(Number(id)).then((response) => {
      setReferenceId(response.data.referenceId);
    });
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Appointment = {
        participantAppointmentId: Number(childId),
        participantId: Number(id),
        referenceId: state.referenceId,
        appointmentdto: {
          appointmentId: state.appointmentdto.appointmentId,
          subject: form.subject.value,
          status: form.appointmentstatus.value,
          date: form.date.value,
          time: form.time.value,
          location: form.location.value,
          duration: form.duration.value,
          client: clientID,
          caseworker: form.caseworker.value,
          recurringAppointment: form.recurringappointment.value,
          frequency: form.frequency.value,
          endDate: form.endDate.value,
          notes: form.notes.value,
        },
      };
      postAppointments(formData).then(() => {
        navigate(`../appointment/${id}`);
      });
    }
  };

  // Handles the form data submi and other
  // activities.
  const changeHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    // START: When user selects a date in "Start Date" field then
    // set that selected date as min date in "End Date" field.
    form.endDate.min = form.date.value;
    // END:
    // if (form.recurringappointment.value === "Yes") {
    //   dispatch(enableClosingDate(null));
    //   dispatch(enableFrequency(null));
    // } else {
    //   dispatch(disableClosingDate(null));
    //   dispatch(disableFrequency(null));
    // }
  };

  const handleSearch = () => {
    if (!disabled) {
      setClick(true);
    }
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        onChange={changeHandler}
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
              participantAppointmentId={state.participantAppointmentId}
              targetValue={targetValue}
            />
          </Box>
        )}
        {disabled && (
          <Typography sx={{ p: 1 }}>ReferenceId: {referenceId}</Typography>
        )}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="subject"
              value="Subject"
              required
              autofill={state.appointmentdto.subject}
              readOnly={disabled}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="appointmentstatus"
              value="Status"
              required
              autofill={state.appointmentdto.status}
              disabled={disabled}
              optionsList={Object.values(status).map(
                (status: any) => status.en
              )}
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
              autofill={state.appointmentdto.date}
              minDate="1900-01-01"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="time"
              value="Time"
              type="time"
              autofill={state.appointmentdto.time}
              readOnly={disabled}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="location"
              value="Location"
              autofill={state.appointmentdto.location}
              readOnly={disabled}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="duration"
              value="Duration"
              autofill={state.appointmentdto.duration}
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
                Client
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
              />
            </FormControl>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="caseworker"
              value="Caseworker"
              autofill={state.appointmentdto.caseworker}
              readOnly={disabled}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="recurringappointment"
              value="Is this a recurring appointment ?"
              autofill={state.appointmentdto.recurringAppointment}
              disabled={disabled}
              optionsList={Object.values(recurring).map(
                (status: any) => status.en
              )}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="frequency"
              value="Frequency"
              disabled={disabledField}
              autofill={state.appointmentdto.frequency}
              optionsList={Object.values(frequency).map(
                (status: any) => status.en
              )}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="endDate"
              disabled={disabledField}
              value="End Date"
              minDate="1900-01-01"
              type="date"
              autofill={state.appointmentdto.endDate}
            />
          </Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          disabled={disabledField}
          outlinedInputFlex="5.3 1 0"
          id="notes"
          value="Notes"
          autofill={state.appointmentdto.notes}
          readOnly={disabled}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton disabled={disabled} />
        </Box>
        {click && (
          <SearchClientName
            click={click}
            setClick={setClick}
            moduleName="icAppointment"
            searchId="icparticipantId"
            setClientName={setClientName}
            setClientId={setClientId}
          />
        )}
      </Box>
    </CYFMSLayout>
  );
};

export default EditAppointmentPage;
