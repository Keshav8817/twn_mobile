import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import EditIcon from "../../../components/ic/appointments/EditIcon";
import { readFileDetails } from "../fileDetails/Service";
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
import IcLayout from "../../../components/ic/ICLayout";
import SearchClientName from "../../../components/ic/searchClient/SearchClientName";
import { getICAppointment, postICAppointment } from "./service";
import { Navigate, useNavigate, useParams } from "react-router";
import { Data } from "./AppointmentDataTypes";
import {
  getAppointmentsStatusCodetable,
  getFrequencyCodetable,
  getIcReferralCodetable,
} from "../../../services/codetableService";
import ICInput from "../../../components/ic/Input";

const Edit: FC<any> = ({ setAddNew, targetValue }) => {
  const navigate = useNavigate();
  const { id, childId } = useParams();
  const [disabledField, setDisabledField] = useState<boolean>(false);
  const [click, setClick] = useState(false);
  const [status, setStatus] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [frequency, setFrequency] = useState({});
  const [recurring, setRecurring] = useState({});
  const [fileNo, setFileNo] = useState(0);
  const [clientName, setClientName] = useState("");
  const [clientID, setClientId] = useState(0);
  const [state, setState] = useState({
    icappointmentId: Number(childId),
    fileDetailsId: Number(id),
    fileDetailsNo: 0,
    appointmentDto: {
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
  console.log(id);
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
    getICAppointment(Number(childId)).then(({ data }) => {
      setState(data);
      setClientName(data.appointmentDto.client);
      setClientId(data.appointmentDto.participantId);
      setDisabledField(false);
    });
    readFileDetails(Number(id)).then(({ data }) => {
      setFileNo(data.fileNumber);
    });
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Data = {
        icappointmentId: Number(childId),
        fileDetailsId: Number(id),
        fileDetailsNo: state.fileDetailsNo,
        appointmentDto: {
          appointmentId: state.appointmentDto.appointmentId,
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
      postICAppointment(formData).then(() => {
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
    if (form.recurringappointment.value === "Yes") {
      setDisabledField(false);
    } else {
      setDisabledField(true);
    }
  };

  const handleSearch = () => {
    if (!disabled) {
      setClick(true);
    }
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
        onChange={changeHandler}
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
            icappointmentId={state.icappointmentId}
          />
        </Box>

        <Typography sx={{ p: 1 }}>File No:{fileNo}</Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              id="subject"
              value="Subject"
              required
              autofill={state.appointmentDto.subject}
              readOnly={disabled}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="appointmentstatus"
              value="Status"
              required
              autofill={state.appointmentDto.status}
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
              autofill={state.appointmentDto.date}
              minDate="1900-01-01"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="time"
              value="Time"
              type="time"
              autofill={state.appointmentDto.time}
              readOnly={disabled}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              id="location"
              value="Location"
              autofill={state.appointmentDto.location}
              readOnly={disabled}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              id="duration"
              value="Duration"
              autofill={state.appointmentDto.duration}
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
            <ICInput
              id="caseworker"
              value="Caseworker"
              autofill={state.appointmentDto.caseworker}
              readOnly={disabled}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="recurringappointment"
              value="Is this a recurring appointment ?"
              autofill={state.appointmentDto.recurringAppointment}
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
              required
              disabled={disabledField}
              value="Frequency"
              // disabled={stete.disabledFrequency}
              autofill={state.appointmentDto.frequency}
              readOnly={disabled}
              optionsList={Object.values(frequency).map(
                (status: any) => status.en
              )}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="endDate"
              required
              //disabled={stete.disabledClosingDate}
              disabled={disabledField}
              value="End Date"
              minDate="1900-01-01"
              type="date"
              autofill={state.appointmentDto.endDate}
            />
          </Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          disabled={disabledField}
          outlinedInputFlex="5.3 1 0"
          id="notes"
          value="Notes"
          autofill={state.appointmentDto.notes}
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
    </IcLayout>
  );
};

export { Edit as IcAppointmentEdit };
