import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import CgLayout from "../../../components/cg/CgLayout";
import { onKeyDown } from "../../../library/app";
import {
  Box,
  FormControl,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import SearchClientName from "../../../components/cyfms/searchClient/SearchClientName";
import { getProvinceCodetable } from "../../../services/codetableService";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { FC, FormEvent } from "react";
import { getCgStatusCodetable } from "../../../services/codetableService";
import { getCgTypeCodetable } from "../../../services/codetableService";
import { Data } from "./CareProviderDataType";
import { readCareProvider, saveCareProvider } from "./CareProviderService";
import { PopupDispatchContext } from "../../../contexts/PopupContext";
import { TabbarDispatchContext } from "../../../contexts/TabbarContext";
import SearchClientName from "../../../components/ic/searchClient/SearchClientName";
import ICInput from "../../../components/ic/Input";

/**
 * `CG` aka `Caregivers` module.
 * Sub page: `Care Provider`.
 * @returns `ReactElement`
 */
const CareProvider: FC = () => {
  const [searchId, setSearchId] = useState("");
  const [clientID, setClientId] = useState(0);
  const [primary, setPrimary] = useState<boolean>();
  const [disableOthertype, setDisableOtherType] = useState<boolean>(false);
  const [secondary, setSecondary] = useState<boolean>();
  const [sClientID, setSClientId] = useState(0);
  const [click, setClick] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [sClientName, setSClientName] = useState("");
  const [getCgType, setCgType] = useState({});
  const [getCgStatus, setCgStatus] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [getCgProvince, setCgProvince] = useState({});
  const popupDispatchContext = useContext(PopupDispatchContext);
  const tabbarDispatchContext = useContext(TabbarDispatchContext);
  const [state, setState] = useState<Data>({
    Id: Number(id) | 0,
    referenceId: 0,
    name: "",
    status: "",
    type: "",
    otherType: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    phoneNumber: "",
    email: "",
    primaryCaregiver: "",
    secondaryCaregiver: "",
  });
  useEffect(() => {
    getCgTypeCodetable().then((response) => {
      setCgType(response.data.valuesMap);
    });
    getCgStatusCodetable().then((response) => {
      setCgStatus(response.data.valuesMap);
    });
    getProvinceCodetable().then((response) => {
      setCgProvince(response.data.valuesMap);
    });
    readCareProvider(Number(id)).then(({ data }) => {
      setState(data);
      setClientName(data.primaryCaregiver);
      setSClientName(data.secondaryCaregiver);
      setSClientId(data.secParticipantId);
      setDisableOtherType(true);
      setClientId(data.PreParticipantId);
      // if (data.Id !== 0) {
      //   setDisabled(true);
      // }
    });
  }, []);
  const handleSearch = () => {
    setSecondary(false);
    setPrimary(true);
    if (!disabled) {
      setClick(true);
    }
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      Id: Number(id) | 0,
      name: form.naam.value,
      status: form.status.value,
      type: form.type.value,
      otherType: form.otherType.value,
      address: form.address.value,
      city: form.city.value,
      postalCode: form.postalCode.value,
      province: form.province.value,
      phoneNumber: form.phoneNumber.value,
      email: form.eMail.value,
      primaryCaregiver: clientID,
      secondaryCaregiver: sClientID,
    };

    console.log(formData);
    saveCareProvider(formData).then((res) => {
      popupDispatchContext({
        type: "change_id",
        id: res.data.id,
      });
      tabbarDispatchContext({
        type: "toggle_hidden",
        hidden: false,
      });
      navigate(`../capacity/${res.data.id}`);
    });
  };

  return (
    <CgLayout>
      <Box
        component="form"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
          "> div": { display: "flex", gap: "0 1rem" },
          "> div > div": { flex: "1 1 0" },
        }}
        onChange={(event: SyntheticEvent<HTMLFormElement>) => {
          if (event.currentTarget.type.value === "Other") {
            setDisableOtherType(false);
          } else {
            event.currentTarget.otherType.value = " ";
            setDisableOtherType(true);
          }
        }}
        onSubmit={submitHandler}
        onKeyDown={onKeyDown}
      >
        {state.referenceId !== 0 && (
          <Typography paddingLeft={1}>
            Reference ID : {state.referenceId}
          </Typography>
        )}
        <div>
          <div>
            <Input autofill={state.name} id="naam" value="Name" required />
          </div>
          <div>
            <Dropdown
              autofill={state.status}
              id="status"
              optionsList={Object.values(getCgStatus).map(
                (cgStatus: any) => cgStatus.en
              )}
              value="Status"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <Dropdown
              autofill={state.type}
              id="type"
              value="Type"
              optionsList={Object.values(getCgType).map(
                (cgStatus: any) => cgStatus.en
              )}
              required
            />
          </div>
          <div>
            <Input
              autofill={state.otherType}
              disabled={disableOthertype}
              id="otherType"
              value="Please Specify"
            />
          </div>
        </div>
        <div>
          <div>
            <Input autofill={state.address} id="address" value="Address" />
          </div>
          <div>
            {" "}
            <Input autofill={state.city} id="city" value="City" />
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.postalCode}
              id="postalCode"
              value="Postal Code"
            />
          </div>
          <div>
            <Dropdown
              autofill={state.province}
              id="province"
              value="Province"
              optionsList={Object.values(getCgProvince).map(
                (cgStatus: any) => cgStatus.en
              )}
            />
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.phoneNumber}
              id="phoneNumber"
              value="Phone Number"
            />
          </div>
          <div>
            <Input
              autofill={state.email}
              type="email"
              id="eMail"
              value="Email"
            />
          </div>
        </div>
        <div>
          <div>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <FormLabel
                sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}
              >
                Primary Caregiver *
              </FormLabel>
              <OutlinedInput
                sx={{
                  borderRadius: 0,
                  flexBasis: 0,
                  flexGrow: 1.9,
                }}
                id="primaryCaregiver"
                size="small"
                value={clientName}
                style={{ backgroundColor: "#dfdada" }}
                required
                endAdornment={<SearchIcon onClick={handleSearch} />}
              />
            </FormControl>
          </div>
          <div>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <FormLabel
                sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}
              >
                Secondary Caregiver
              </FormLabel>
              <OutlinedInput
                sx={{
                  borderRadius: 0,
                  flexBasis: 0,
                  flexGrow: 1.9,
                }}
                id="secondaryCaregiver"
                value={sClientName}
                size="small"
                style={{ backgroundColor: "#dfdada" }}
                endAdornment={
                  <SearchIcon
                    onClick={() => {
                      setPrimary(false);
                      setClick(true);
                      setSearchId("secondary");
                      setSecondary(true);
                    }}
                  />
                }
              />
            </FormControl>
          </div>
        </div>
        <Box sx={{ justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
      {click && (
        <div>
          {primary && (
            <SearchClientName
              searchId={searchId}
              click={click}
              setClick={setClick}
              moduleName="caregivers"
              setClientName={setClientName}
              // secsetClientName={setsecClientName}
              setClientId={setClientId}
              // secsetClientId={secsetClientId}
            />
          )}

          {secondary && (
            <SearchClientName
              searchId={searchId}
              click={click}
              setClick={setClick}
              moduleName="caregiversseconadary"
              // setClientName={setClientName}
              setClientName={setSClientName}
              // setClientId={setClientId}
              setClientId={setSClientId}
            />
          )}
        </div>
      )}
    </CgLayout>
  );
};

export default CareProvider;
