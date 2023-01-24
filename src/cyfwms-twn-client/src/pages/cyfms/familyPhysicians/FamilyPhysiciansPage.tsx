import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../../components/CYFSWMSButtons";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import RecordList from "../../../components/cyfms/familyPhysicians/RecordList";
import { onKeyDown } from "../../../library/app";
import {
  readFamilyPhysicians,
  saveFamilyPhysicians,
} from "./familyPhysiciansService";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { FamilyPhysician } from "./familyPhysiciansDatatypes";
import type { FC } from "react";

/**
 * `FamilyPhysiciansPage`
 */
const FamilyPhysiciansPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<FamilyPhysician[]>([
    {
      participantId: Number(id),
      familyPhysicianId: 0,
      name: "",
      phone: "",
      cell: "",
      listOfMedication: "",
    },
  ]);

  // Reference to the form
  const formRef = useRef<HTMLFormElement>(null);

  const addFields = () => {
    let object: any = {
      participantId: Number(id),
      familyPhysicianId: 0,
      name: "",
      phone: "",
      cell: "",
      listOfMedication: "",
    };
    setData([...data, object]);
  };

  useEffect(() => {
    readFamilyPhysicians(Number(id)).then((response) => {
      if (response.data.length > 0) {
        setData(response.data);
      } else if (response.data.length === 0) {
        setData([
          {
            participantId: Number(id),
            familyPhysicianId: 0,
            name: "",
            phone: "",
            cell: "",
            listOfMedication: "",
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
        familyPhysicianId: data[index].familyPhysicianId,
        name: event.currentTarget[`record_${index}_Name`].value,
        phone: event.currentTarget[`record_${index}_Phone`].value,
        cell: event.currentTarget[`record_${index}_Cell`].value,
        listOfMedication:
          event.currentTarget[`record_${index}_ListOfMedication`].value,
      };
    }
    saveFamilyPhysicians(formData).then(() => {
      navigate(`../counselors/${id}`);
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
        <Box sx={{ display: "flex", gap: "0 1rem", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default FamilyPhysiciansPage;
