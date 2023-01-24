import Input from "../../../components/Input";
import AttachmentsContext from "../../../contexts/AttachmentsContext";
import { Box, Link } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import type { FC } from "react";
import { useParams } from "react-router";
import { getCgAttachments } from "./service";
import { Data } from "./AttachmentDataTypes";

import CgLayout from "../../../components/cg/CgLayout";
import ICInput from "../../../components/ic/Input";
import EditIcon from "../../../components/cg/attachments/EditIcon";

/**
 * `IC` aka `Initial Contact` module.
 * Sub page: `Attachments`.
 * Sub sub page: `View`.
 * Form to view document information selected from attachments.
 * @returns `ReactElement`
 */
const View: FC = () => {
  const { id, childId } = useParams();
  const context = useContext(AttachmentsContext);

  // const dispatch = useAppDispatch();
  // const attachment = useAppSelector(
  //   (state) => state.icAttachments.data[context.selected]
  // );
  const [actualAttachment, setActualAttachment] = useState<any>({
    cgImageName: "",
    cgImageType: "",
  });
  const [state, setState] = useState<Data>({
    id: Number(id),
    cgImageId: Number(childId),
    cgImageName: "",
    // cgImageType: "",
    name: "",
    type: "",
  });

  /** Download the attachment */
  useEffect(() => {
    getCgAttachments(Number(childId)).then(({ data }) => {
      setState(data);
      setActualAttachment(data);
    });
    // dispatch(doGetOne(attachment.icAttachmentId))
    //   .unwrap()
    //   .then((data) => {
    //     setActualAttachment(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <CgLayout>
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
              href={`data:${actualAttachment.cgImageType};base64,${actualAttachment.cgImageFile}`}
              rel="noreferrer noopener"
            >
              {actualAttachment.cgImageName}
            </Link>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box />
      </Box>
    </CgLayout>
  );
};

export default View;
