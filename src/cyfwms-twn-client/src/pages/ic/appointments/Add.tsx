import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import EditIcon from "../../../components/ic/appointments/EditIcon";

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
import SearchClientName from "../../../components/ic/searchClient/SearchClientName";
import { Data } from "./AppointmentDataTypes";
import { postICAppointment } from "./service";
import { useNavigate, useParams } from "react-router";
import IcLayout from "../../../components/ic/ICLayout";
import {
  getAppointmentsStatusCodetable,
  getFrequencyCodetable,
  getIcReferralCodetable,
} from "../../../services/codetableService";
import { readFileDetails } from "../fileDetails/Service";

const Add: FC<any> = ({ setDisabled, disabled, targetValue }) => {
  const navigate = useNavigate();
  const [disabledField, setDisabledField] = useState<boolean>(false);
  const { id } = useParams();
  const [state, setState] = useState({
    icappointmentId: 0,
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

  const [click, setClick] = useState(false);
  const [status, setStatus] = useState({});
  const [fileNo, setFileNo] = useState(0);
  const [clientName, setClientName] = useState("");
  const [clientID, setClientId] = useState(0);
  const [frequency, setFrequency] = useState({});
  const [recurring, setRecurring] = useState({});

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
    readFileDetails(Number(id)).then(({ data }) => {
      setFileNo(data.fileNumber);
      setDisabledField(true);
    });
  }, []);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Data = {
        icappointmentId: state.icappointmentId,
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
    if (form.recurringappointment.value === "Yes") {
      setDisabledField(false);
    } else {
      form.frequency.value = "";
      form.endDate.value = "";
      form.notes.value = "";
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
        ></Box>
        <Typography sx={{ p: 1 }}>File No:{fileNo}</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="subject" value="Subject" required readOnly={disabled} />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="appointmentstatus"
              value="Status"
              required
              autofill={""}
              disabled={disabled}
              optionsList={Object.values(status).map(
                (status: any) => status.en
              )}
              // optionsList={["a", "b", "c"]}
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
              minDate="1900-01-01"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="time" value="Time" type="time" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="location" value="Location" readOnly={disabled} />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="duration" value="Duration" readOnly={disabled} />
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
                value={clientName}
                style={{ backgroundColor: "#dfdada" }}
                endAdornment={<SearchIcon onClick={handleSearch} />}
              />
            </FormControl>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="caseworker" value="Caseworker" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              id="recurringappointment"
              value="Is this a recurring appointment ?"
              autofill={""}
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
              required
              autofill={""}
              disabled={disabledField}
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
            />
          </Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          disabled={disabledField}
          id="notes"
          value="Notes"
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

export { Add as IcAppointmentAdd };
