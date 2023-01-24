import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import { onKeyDown } from "../../../library/app";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ChangeEventHandler, FC, FormEventHandler } from "react";
import { postCPAAttachments } from "./service";
import CPALayout from "../../../components/cpa/CPALayout";

/**
 * `CPA` aka `Cultural Program And Activity` module.
 * Sub page: `Attachments`.
 * Sub sub page: `Add`.
 * Form to submit/add one more document to attachments.
 * @returns `ReactElement`
 */
const Add: FC = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string>("");
  const { id } = useParams();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileName(e.currentTarget.value.replace(/^.*[\\/]/, ""));
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const attachment = new FormData();
    attachment.append(
      "culturalDto",
      JSON.stringify({
        culturalProgramId: Number(id),
        culturalProgImageId: 0,
        name: e.currentTarget.attachmentName.value,
        type: e.currentTarget.attachmentType.value,
      } as any)
    );
    attachment.append("file", e.currentTarget.attachment.files[0]);
    postCPAAttachments(attachment).then(() => {
      navigate(`../attachments/${id}`);
    });
  };

  return (
    <CPALayout>
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
            <Input id="attachmentName" value="Name" />
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
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "white",
                }}
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
    </CPALayout>
  );
};

export default Add;
