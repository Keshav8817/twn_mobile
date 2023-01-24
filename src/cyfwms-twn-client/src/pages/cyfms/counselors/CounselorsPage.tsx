import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../../components/CYFSWMSButtons";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import RecordList from "../../../components/cyfms/counselors/RecordList";
import { onKeyDown } from "../../../library/app";
import { getRolesCodetable } from "../../service/codetableService";
import { readCounselors, saveCounselors } from "./counselorsService";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Counselor } from "./counselorsDatatypes";
import type { FC } from "react";

/**
 * `CounselorsPage`
 */
const CounselorsPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Reference to the form
  const formRef = useRef<HTMLFormElement>(null);
  const [rolesCodetable, setRolesCodetable] = useState<any>([]);
  const [data, setData] = useState<Counselor[]>([
    {
      participantId: Number(id),
      counselorCFSWorkerId: 0,
      role: "",
      name: "",
      startDate: "",
      endDate: "",
      contactInformation: "",
    },
  ]);

  const addFields = () => {
    let object: any = {
      participantId: Number(id),
      counselorCFSWorkerId: 0,
      role: "",
      name: "",
      startDate: "",
      endDate: "",
      contactInformation: "",
    };
    setData([...data, object]);
  };

  useEffect(() => {
    getRolesCodetable().then((response) => {
      setRolesCodetable(response.data.valuesMap);
    });
    readCounselors(Number(id)).then((response) => {
      if (response.data.length > 0) {
        setData(response.data);
      } else if (response.data.length === 0) {
        setData([
          {
            participantId: Number(id),
            counselorCFSWorkerId: 0,
            role: "",
            name: "",
            startDate: "",
            endDate: "",
            contactInformation: "",
          },
        ]);
      }
    });
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
    const formData: any = [];
    for (let index = 0; index < data.length; ++index) {
      formData[index] = {
        participantId: Number(id),
        counselorCFSWorkerId: data[index].counselorCFSWorkerId,
        role: event.currentTarget[`record_${index}_Role`].value,
        name: event.currentTarget[`record_${index}_Name`].value,
        startDate: event.currentTarget[`record_${index}_StartDate`].value,
        endDate: event.currentTarget[`record_${index}_EndDate`].value,
        contactInformation:
          event.currentTarget[`record_${index}_ContactInformation`].value,
      };
    }
    saveCounselors(formData).then(() => {
      navigate(`../other_information/${id}`);
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
          <RecordList
            data={data}
            setData={setData}
            rolesCodetable={rolesCodetable}
          />
        </Box>
        <Box>
          <CYFSWMSAddButton onClick={addFields} />
        </Box>
        <Box sx={{ display: "flex", gap: "0 1rem", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CounselorsPage;
