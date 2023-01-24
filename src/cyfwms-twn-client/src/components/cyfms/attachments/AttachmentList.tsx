import AttachmentsContext from "../../../contexts/AttachmentsContext";
import { TableCell, TableRow } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Attachment } from "../../../pages/cyfms/attachments/attachmentsDatatypes";
import type { FC } from "react";

/**
 * `AttachmentList` is used to list attachments of `CYFMS` aka \
 * `Child, Youth, Family, and Management Services` module.
 * @param props
 */
const AttachmentList: FC<AppRecordListProps<Attachment>> = (props) => {
  const navigate = useNavigate();
  const context = useContext(AttachmentsContext);
  return (
    <>
      {props.list.map((attachment, index) => (
        <TableRow key={Math.random() * 1000}>
          <TableCell>
            <Link
              to={`../attachments/view/${attachment.participantId}/${attachment.participantAttachmentId}`}
              onClick={() => {
                context.setAttachment(attachment);
              }}
            >
              Select
            </Link>
          </TableCell>
          <TableCell>{attachment.name}</TableCell>
          <TableCell>{attachment.type}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default AttachmentList;
