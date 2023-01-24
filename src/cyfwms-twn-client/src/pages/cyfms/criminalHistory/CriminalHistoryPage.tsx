import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../../components/CYFSWMSButtons";
import Checkbox from "../../../components/Checkbox";
import Input from "../../../components/Input";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import TextArea from "../../../components/TextArea";
import RecordList from "../../../components/cyfms/criminalHistory/RecordList";
import { onKeyDown } from "../../../library/app";
import {
  readCriminalHistory,
  saveCriminalHistory,
} from "./criminalHistoryService";
import { Box, FormGroup } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
  CriminalHistory,
  CriminalHistoryRecord,
} from "./criminalHistoryDatatypes";
import type { FC } from "react";

/**
 * `CriminalHistoryPage`
 */
const CriminalHistoryPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<CriminalHistory>({
    participantId: Number(id),
    criminalHistoryId: 0,
    criminalHistoryRecordList: [
      {
        criminalHistoryRecordId: 0,
        criminalHistoryId: 0,
        arrestDate: "",
        charges: "",
        conviction: "",
        sentence: "",
      },
    ],
    probation: false,
    parole: false,
    conditions: "",
    courtWorkerAndContactInfo: "",
  });

  // Reference to the form
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    readCriminalHistory(Number(id)).then((response) => {
      if (response.data.participantId) {
        setData(response.data);
      }
    });
  }, []);

  //Add-More Fields
  const addFields = () => {
    let object: CriminalHistoryRecord = {
      criminalHistoryRecordId: 0,
      criminalHistoryId: 0,
      arrestDate: "",
      charges: "",
      conviction: "",
      sentence: "",
    };
    let addRecord: CriminalHistory = {
      participantId: Number(id),
      criminalHistoryId: data.criminalHistoryId,
      criminalHistoryRecordList: [...data.criminalHistoryRecordList, object],
      probation: data.parole,
      parole: data.probation,
      conditions: data.conditions,
      courtWorkerAndContactInfo: data.courtWorkerAndContactInfo,
    };
    setData(addRecord);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    const records: CriminalHistoryRecord[] = [];
    for (
      let index = 0;
      index < data.criminalHistoryRecordList.length;
      ++index
    ) {
      records[index] = {
        criminalHistoryRecordId:
          data.criminalHistoryRecordList[index].criminalHistoryRecordId,
        arrestDate: e.currentTarget[`record_${index}_ArrestDate`].value,
        charges: e.currentTarget[`record_${index}_Charges`].value,
        conviction: e.currentTarget[`record_${index}_Conviction`].value,
        sentence: e.currentTarget[`record_${index}_Sentence`].value,
      };
      if (data.criminalHistoryId > 0) {
        records[index].criminalHistoryId = data.criminalHistoryId;
      }
    }
    const formData: CriminalHistory = {
      participantId: Number(id),
      criminalHistoryId: data.criminalHistoryId,
      probation: e.currentTarget.probation.checked,
      criminalHistoryRecordList: records,
      parole: e.currentTarget.parole.checked,
      conditions: e.currentTarget.conditions.value,
      courtWorkerAndContactInfo:
        e.currentTarget.courtWorkersAndContactInformation.value,
    };
    saveCriminalHistory(formData).then(() => {
      navigate(`../family_physicians/${id}`);
    });
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
        ref={formRef}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <RecordList data={data} setData={setData} />
        </Box>
        <Box>
          <CYFSWMSAddButton onClick={addFields} />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <FormGroup sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Checkbox
              id="probation"
              label="Probation"
              checked={data.probation}
            />
            <Checkbox id="parole" label="Parole" checked={data.parole} />
          </FormGroup>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.conditions}
              id="conditions"
              value="Condition(s)"
            />
          </Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.1 1 0"
          autofill={data.courtWorkerAndContactInfo}
          id="courtWorkersAndContactInformation"
          value="Court Worker(s) And Contact Information"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CriminalHistoryPage;
