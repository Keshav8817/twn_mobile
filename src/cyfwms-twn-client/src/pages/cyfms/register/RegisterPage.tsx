import Checkbox from "../../../components/Checkbox";
import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import FileInput from "../../../components/FileInput";
import Input from "../../../components/Input";
import CYFMSDropdown from "../../../components/Dropdown";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import { PopupDispatchContext } from "../../../contexts/PopupContext";
import { TabbarDispatchContext } from "../../../contexts/TabbarContext";
import { onKeyDown } from "../../../library/app";
import {
  getGendersCodetable,
  getMaritalStatusCodetable,
} from "../../../services/codetableService";
import { readIdentity, saveIdentity } from "./registerService";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Register } from "./registerDatatypes";
import type { FC } from "react";

/**
 * `RegisterPage`
 */
const RegisterPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const popupDispatchContext = useContext(PopupDispatchContext);
  const tabbarDispatchContext = useContext(TabbarDispatchContext);
  const [gendersCodetable, setGendersCodetable] = useState<any>([]);
  const [maritalstatusCodetable, setMaritalStatusCodetable] = useState<any>([]);
  const [disabled, setDisabled] = useState(false);
  const [removeProfilePicture, setRemoveProfilePicture] =
    useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [state, setState] = useState<Register>({
    participantId: Number(id),
    referenceId: 0,
    firstname: "",
    middleName: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    participantImageId: 0,
    image: "",
    type: "",
    participantImageName: "",
  });

  useEffect(() => {
    getGendersCodetable().then((response) => {
      setGendersCodetable(response.data.valuesMap);
    });
    getMaritalStatusCodetable().then((response) => {
      setMaritalStatusCodetable(response.data.valuesMap);
    });
    readIdentity(Number(id)).then((response) => {
      setState(response.data);
      if (response.data.image) {
        setImage(response.data.participantImageName);
      }
    });
  }, []);

  return (
    <CYFMSLayout>
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
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append("participantId", String(id));
          formData.append("referenceId", String(state.referenceId));
          formData.append("firstName", event.currentTarget.firstName.value);
          formData.append("middleName", event.currentTarget.middleName.value);
          formData.append("lastName", event.currentTarget.lastName.value);
          formData.append("dateOfBirth", event.currentTarget.dateOfBirth.value);
          formData.append("gender", event.currentTarget.gender.value);
          formData.append(
            "maritalStatus",
            event.currentTarget.maritalStatus.value
          );
          formData.append("removeProfilePicture", `${removeProfilePicture}`);
          formData.append("participantImageId", `${state.participantImageId}`);
          formData.append("image", event.currentTarget.imageFile.files[0]);
          saveIdentity(formData).then((response) => {
            popupDispatchContext({
              type: "change_id",
              id: response.data.participantId,
            });
            tabbarDispatchContext({
              type: "toggle_hidden",
              hidden: false,
            });
            navigate(`../contact/${response.data.participantId}`);
          });
        }}
        onKeyDown={onKeyDown}
      >
        {state.referenceId !== 0 && (
          <Typography paddingLeft={1}>
            Reference ID: {state.referenceId}
          </Typography>
        )}
        <div>
          <div>
            <Input
              autofill={state.firstname}
              id="firstName"
              value="First Name"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
              required
            />
          </div>
          <div>
            <Input
              autofill={state.middleName}
              id="middleName"
              value="Middle Name"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
            />
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.surname}
              id="lastName"
              value="Last Name"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
              required
            />
          </div>
          <div>
            <Input
              autofill={state.dateOfBirth}
              id="dateOfBirth"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              type="date"
              value="Date of Birth"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <CYFMSDropdown
              autofill={state.gender}
              id="gender"
              optionsList={Object.values(gendersCodetable).map(
                (gender: any) => gender.en
              )}
              value="Gender"
              required
            />
          </div>
          <div>
            <CYFMSDropdown
              autofill={state.maritalStatus}
              id="maritalStatus"
              optionsList={Object.values(maritalstatusCodetable).map(
                (status: any) => status.en
              )}
              value="Marital Status"
            />
          </div>
        </div>
        <div>
          <div>
            <FileInput id="imageFile" value="Photograph" />
          </div>
          <div></div>
        </div>
        <div>
          <div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ flex: "1 1 0" }}></Box>
              <Box sx={{ flex: "2.1 1 0" }}>
                {image ? (
                  <Checkbox
                    id="removeProfilePicture"
                    icon={<ClearIcon />}
                    label={image}
                    checkedIcon={<ClearIcon color="error" />}
                    labelPlacement="start"
                    someFunction={setImage}
                    someFunction2={setRemoveProfilePicture}
                  />
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </div>
          <div></div>
        </div>
        <Box sx={{ justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default RegisterPage;
