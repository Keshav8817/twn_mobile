import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../../components/CYFSWMSButtons";
import EditIcon from "../../../components/ic/attachments/EditIcon";
import IcLayout from "../../../components/ic/ICLayout";
import Input from "../../../components/Input";
import AttachmentsContext from "../../../contexts/AttachmentsContext copy";
import { onKeyDown } from "../../../library/app";
import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ChangeEventHandler, FC, FormEventHandler } from "react";
import { getICAttachments, postICAttachments } from "./service";
import ICInput from "../../../components/ic/Input";
import axiosInstance from "../../../library/axiosInstance";
import { Attachment } from "./AttachmentDataTypes";
/**
 * `IC` aka `Initial Contact` module.
 * Sub page: `Attachments`.
 * Sub sub page: `Edit`.
 * Form to edit document information selected from attachments.
 * @returns `ReactElement`
 */
const Edit: FC = () => {
  const navigate = useNavigate();
  const { id, childId } = useParams();
  const context = useContext(AttachmentsContext);
  const [disabled, setDisabled] = useState(true);
  const [fileName, setFileName] = useState<string>("");
  const [state, setState] = useState<Attachment>({
    fileDetailsId: Number(id),
    icAttachmentId: Number(childId),
    icAttachmentName: "",
    name: "",
    type: "",
  });
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileName(e.currentTarget.value.replace(/^.*[\\/]/, ""));
  };
  useEffect(() => {
    getICAttachments(Number(childId)).then(({ data }) => {
      setState(data);
    });
  }, []);
  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const attachment = new FormData();
    attachment.append(
      "icDto",
      JSON.stringify({
        fileDetailsId: Number(id),
        icAttachmentId: Number(childId),
        name: e.currentTarget.attachmentName.value,
        type: e.currentTarget.attachmentType.value,
      } as any)
    );
    postICAttachments(attachment).then(() => {
      navigate(`../attachments/${id}`);
    });
    if (e.currentTarget.attachment.files[0]) {
      attachment.append("file", e.currentTarget.attachment.files[0]);
    }
    // axiosInstance
    //   .put("initialcontactservice/attachments/save_one", attachment, {
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) => {
    //     navigate(`../attachments/${id}`);
    //   });
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
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="attachmentName" value="Name" autofill={state.name} />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="attachmentType" value="Type" a autofill={state.type} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                gap: "0 1rem",
                alignItems: "center",
              }}
            >
              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  name="attachment"
                  type="file"
                  onChange={handleChange}
                />
              </Button>
              {fileName}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </IcLayout>
  );
};

export default Edit;
