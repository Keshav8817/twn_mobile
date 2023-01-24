import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import { onKeyDown } from "../../../library/app";
import { getProvinceCodetable } from "../../../services/codetableService";
import { readContact, saveContact } from "./contactService";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Contact } from "./contactDatatypes";
import type { FC } from "react";

/**
 * `ContactPage`
 */
const ContactPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provinceCodetable, setProvinceCodetable] = useState<any>([]);
  const [disabled, setDisabled] = useState(false);
  const [state, setState] = useState<Contact>({
    participantId: Number(id),
    participantContactId: 0,
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    postalCode: "",
    homePhone: "",
    workPhone: "",
    cellPhone: "",
    emailAddress: "",
  });

  useEffect(() => {
    getProvinceCodetable().then((response) => {
      setProvinceCodetable(response.data.valuesMap);
    });
    readContact(Number(id)).then((response) => {
      setState(response.data);
      if (state.participantContactId !== 0) {
        setDisabled(true);
      }
    });
  }, []);

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          const formData: Contact = {
            participantId: Number(id),
            participantContactId: state.participantContactId,
            addressLine1: event.currentTarget.addressLine1.value,
            addressLine2: event.currentTarget.addressLine2.value,
            city: event.currentTarget.city.value,
            province: event.currentTarget.province.value,
            postalCode: event.currentTarget.postalCode.value,
            homePhone: event.currentTarget.homePhone.value,
            workPhone: event.currentTarget.workPhone.value,
            cellPhone: event.currentTarget.cellPhone.value,
            emailAddress: event.currentTarget.emailAddress.value,
          };
          saveContact(formData).then(() => {
            navigate(`../household_members/${id}`);
          });
        }}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.addressLine1}
              id="addressLine1"
              value="Address Line 1"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.addressLine2}
              id="addressLine2"
              value="Address Line 2"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.city}
              id="city"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
              value="City"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              autofill={state.province}
              id="province"
              value="Province"
              optionsList={Object.values(provinceCodetable).map(
                (province: any) => province.en
              )}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.postalCode}
              id="postalCode"
              value="Postal Code"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.homePhone}
              id="homePhone"
              validationPattern={`^[^a-zA-Z]*$`}
              validationTitle="Alphabets are not allowed!"
              value="Home Phone"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.cellPhone}
              id="cellPhone"
              validationPattern={`^[^a-zA-Z]*$`}
              validationTitle="Alphabets are not allowed!"
              value="Cell Phone"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.workPhone}
              id="workPhone"
              validationPattern={`^[^a-zA-Z]*$`}
              validationTitle="Alphabets are not allowed!"
              value="Work Phone"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.emailAddress}
              id="emailAddress"
              value="Email Address"
              type="email"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default ContactPage;
