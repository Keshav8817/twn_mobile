import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../../components/CYFSWMSButtons";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import RecordList from "../../../components/cyfms/householdMembers/RecordList";
import { onKeyDown } from "../../../library/app";
import { getGendersCodetable } from "../../../services/codetableService";
import {
  readHouseholdMembers,
  saveHouseholdMembers,
} from "./householdMembersService";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { HouseholdMember } from "./householdMembersDatatypes";
import type { FC } from "react";

/**
 * `HouseholdMembersPage`
 */
const HouseholdMembersPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gendersCodetable, setGendersCodetable] = useState<any>([]);
  const [data, setData] = useState<HouseholdMember[]>([
    {
      participantId: Number(id),
      householdMemberId: 0,
      name: "",
      gender: "",
      dateOfBirth: "",
      relationship: "",
      residing: "",
    },
  ]);

  // Reference to the form
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    getGendersCodetable().then((data) => {
      setGendersCodetable(data.data.valuesMap);
    });
    readHouseholdMembers(Number(id)).then((response) => {
      if (response.data.length > 0) {
        setData(response.data);
      } else if (response.data.length === 0) {
        setData([
          {
            participantId: Number(id),
            householdMemberId: 0,
            name: "",
            gender: "",
            dateOfBirth: "",
            relationship: "",
            residing: "",
          },
        ]);
      }
    });
  }, []);

  const submithandler = (event: any) => {
    event.preventDefault();
    const formData: any = [];
    for (let index = 0; index < data.length; ++index) {
      formData[index] = {
        participantId: data[index].participantId,
        householdMemberId: data[index].householdMemberId,
        name: event.currentTarget[`record_${index}_Name`].value,
        gender: event.currentTarget[`record_${index}_Gender`].value,
        dateOfBirth: event.currentTarget[`record_${index}_DateOfBirth`].value,
        relationship: event.currentTarget[`record_${index}_Relationship`].value,
        residing: event.currentTarget[`record_${index}_Residing`].value,
      };
    }
    saveHouseholdMembers(formData).then(() => {
      navigate(`../education_and_employment/${id}`);
    });
  };

  const addFields = () => {
    let object: any = {
      participantId: Number(id),
      householdMemberId: 0,
      name: "",
      gender: "",
      dateOfBirth: "",
      relationship: "",
      residing: "",
    };
    setData([...data, object]);
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
        onSubmit={submithandler}
        ref={formRef}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <RecordList
            data={data}
            setData={setData}
            gendersCodetable={gendersCodetable}
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

export default HouseholdMembersPage;
