import EditIcon from "../../../components/ic/attachments/EditIcon";
import IcLayout from "../../../components/ic/ICLayout";
import Input from "../../../components/Input";
import AttachmentsContext from "../../../contexts/AttachmentsContext";
import { Box, Link } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import type { FC } from "react";
import { useParams } from "react-router";
import { getICAttachments } from "./service";
import { Attachment } from "./AttachmentDataTypes";
import ICInput from "../../../components/ic/Input";
import axiosInstance from "../../../library/axiosInstance";

/**
 * `IC` aka `Initial Contact` module.
 * Sub page: `Attachments`.
 * Sub sub page: `View`.
 * Form to view document information selected from attachments.
//  * @returns `ReactElement`
 */
const View: FC = () => {
  const { id, childId } = useParams();
  const context = useContext(AttachmentsContext);
  const [actualAttachment, setActualAttachment] = useState<any>({
    icAttachmentType: "",
    icAttachmentName: "",
  });
  // console.log((context.attachment as Attachment).icAttachmentId);
  const [state, setState] = useState<Attachment>({
    fileDetailsId: Number(id),
    icAttachmentId: Number(childId),
    icAttachmentName: "",
    name: "",
    type: "",
  });

  /** Download the attachment */
  useEffect(() => {
    // axiosInstance
    //   .get(`initialcontactservice/attachments/read_one/${childId}`, {
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    //     },
    //   })
    //   .then((response) => {
    //     setState(data);
    //     setActualAttachment(response.data);
    //   });
    getICAttachments(Number(childId)).then(({ data }) => {
      setState(data);
      setActualAttachment(data);
    });
  }, []);

  return (
    <IcLayout>
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
              href={`data:${actualAttachment.icAttachmentType};base64,${actualAttachment.file}`}
              rel="noreferrer noopener"
            >
              {/* {(context.attachment as Attachment).icAttachmentName} */}

              {actualAttachment.icAttachmentName}
            </Link>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box />
      </Box>
    </IcLayout>
  );
};

export default View;
