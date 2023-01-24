import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";

import Input from "../../../components/Input";

import { onKeyDown } from "../../../library/app";

import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { ChangeEventHandler, FC, FormEventHandler } from "react";
import { Data } from "./AttachmentDataTypes";
import { postCgAttachments } from "./service";
import CgLayout from "../../../components/cg/CgLayout";

/**
 * `IC` aka `Initial Contact` module.
 * Sub page: `Attachments`.
 * Sub sub page: `Add`.
 * Form to submit/add one more document to attachments.
 * @returns `ReactElement`
 */
const Add: FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [fileName, setFileName] = useState<string>("");
  // const [state, setState] = useState<Data>({
  //   id: Number(id),

  //   cgImageId: 0,
  //   // cgImageFile: [],
  //   cgImageName: "",
  //   cgImageType: "",
  //   name: "",
  //   type: "",
  // });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileName(e.currentTarget.value.replace(/^.*[\\/]/, ""));
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const attachment = new FormData();
    attachment.append(
      "cgDto",
      JSON.stringify({
        id: Number(id),
        cgImageId: 0,
        name: e.currentTarget.attachmentName.value,
        type: e.currentTarget.attachmentType.value,
      } as any)
    );
    attachment.append("file", e.currentTarget.attachment.files[0]);
    postCgAttachments(attachment).then(() => {
      navigate(`../attachments/${id}`);
    });
  };

  return (
    <CgLayout>
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
            <Input id="attachmentName" value="Names" />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="attachmentType" value="Type" />
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
              <Button
                variant="contained"
                component="label"
                sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
              >
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
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CgLayout>
  );
};

export default Add;
