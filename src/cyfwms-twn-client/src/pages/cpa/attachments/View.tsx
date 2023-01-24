import Input from "../../../components/Input";
import AttachmentsContext from "../../../contexts/AttachmentsContext";
import { Box, Link } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import type { FC } from "react";
import { useParams } from "react-router";
import CPALayout from "../../../components/cpa/CPALayout";
import EditIcon from "../../../components/cpa/attachments/EditIcon";
import { getCPAAttachments } from "./service";
import { Attachment } from "./AttachmentsDatatypes";
import ICInput from "../../../components/cpa/Input";

const View: FC = () => {
  const context = useContext(AttachmentsContext);
  const [disabled, setDisabled] = useState(true);
  const { id, childId } = useParams();
  const [actualAttachment, setActualAttachment] = useState<any>({
    imageType: "",
    culturalimagename: "",
  });
  const [state, setState] = useState<Attachment>({
    culturalProgramId: Number(id),
    culturalProgImageId: Number(childId),
    culturalimagename: "",
    name: "",
    type: "",
  });

  /** Download the attachment */

  useEffect(() => {
    getCPAAttachments(Number(childId)).then(({ data }) => {
      setState(data);
      setActualAttachment(data);
    });
  }, []);

  return (
    <CPALayout>
      <Box
        component="form"
        sx={{
          display: "flex",

          flexDirection: "column",

          gap: "1rem 0",
        }}
      >
        <Box
          sx={{
            display: "flex",

            justifyContent: "flex-end",
          }}
        >
          <EditIcon />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              id="attachmentName"
              value="Name"
              autofill={state.name}
              disabled={true}
            />
          </Box>

          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              id="attachmentType"
              value="Type"
              autofill={state.type}
              disabled={true}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            Download file:{" "}
            <Link
              download={true}
              href={`data:${actualAttachment.imageType};base64,${actualAttachment.file}`}
              rel="noreferrer noopener"
            >
              {actualAttachment.culturalimagename}
            </Link>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>

        <Box />
      </Box>
    </CPALayout>
  );
};

export default View;
