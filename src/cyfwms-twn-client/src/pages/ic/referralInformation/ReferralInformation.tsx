import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import ICLayout from "../../../components/ic/ICLayout";
import { onKeyDown } from "../../../library/app";

import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Data } from "./referralInformationDatatypes";
import { getAllReferralInfo, postAllReferralInfo } from "./services";
import type { FormEvent, ReactElement } from "react";
import ICInput from "../../../components/ic/Input";
import { getIcReferralCodetable } from "../../../services/codetableService";
import CustomCheckbox from "../../../components/ic/CheckBox";
/**
 * The ReferralInformation functional component.
 * @returns ReferralInformation component skeleton.
 */
const ReferralInformation = (): ReactElement => {
  const navigate = useNavigate();

  let { id } = useParams();
  const [state, setState] = useState<Data>({
    fileDetailsId: Number(id),
    referralInfoId: 0,
    referral: "",
    selfReferred: false,
    agencyName: "",
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [referral, setReferral] = useState({});
  useEffect(() => {
    getIcReferralCodetable().then((data) => {
      setReferral(data.data.valuesMap);
    });
    getAllReferralInfo(Number(id)).then(({ data }) => {
      setState(data);
      if (data.referralInfoId !== 0) {
        setDisabled(true);
      }
    });
  }, []);
  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      fileDetailsId: Number(id),
      referralInfoId: state.referralInfoId,
      referral: form.referral.value,
      selfReferred: state.selfReferred,
      agencyName: form.agencyName.value,
      name: form.naam.value,
      address: form.address.value,
      phone: form.phone.value,
      email: form.eMail.value,
    };
    postAllReferralInfo(formData).then(() =>
      navigate(`../incident_report/${id}`)
    );
  };
  const handleCheckBoxOne = (event: any) => {
    setState({ ...state, selfReferred: event.target.checked });
  };

  return (
    <ICLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Dropdown
                    autofill={state.referral}
                    id="referral"
                    value="Referral"
                    optionsList={Object.values(referral).map(
                      (referral: any) => referral.en
                    )}
                    // optionsList={["a", "b", "c"]}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CustomCheckbox
                    label="Self Referral"
                    checked={state.selfReferred}
                    onChange={handleCheckBoxOne}
                    labelPlacement={"start"}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  flexGrow: 5,
                }}
              >
                <Box sx={{ flexBasis: 0, flexGrow: 0.5 }}>
                  <ICInput
                    autofill={state.agencyName}
                    id="agencyName"
                    value="Agency Name"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 0.5 }}>
                  <ICInput autofill={state.name} id="naam" value="Name" />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <ICInput
                    autofill={state.address}
                    id="address"
                    value="Address"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <ICInput autofill={state.phone} id="phone" value="Phone" />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0 1rem",
                }}
              >
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <ICInput autofill={state.email} id="eMail" value="Email" />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </ICLayout>
  );
};

export default ReferralInformation;
