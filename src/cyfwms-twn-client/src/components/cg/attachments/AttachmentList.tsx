import AttachmentsContext from "../../../contexts/AttachmentsContext";
import { TableCell, TableRow } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import type { FC } from "react";

/**
 * `AttachmentList` FC is used to list attachments of
 * `CG` aka `Caregivers` module.
 * @param props
 * @returns `ReactElement`
 */
const AttachmentList: FC<AppRecordListProps<any>> = (props) => {
  const context = useContext(AttachmentsContext);
  return (
    <>
      {props.list.map((attachment, index) => (
        <TableRow key={Math.random() * 1000}>
          <TableCell>
            <Link
              to={`../attachments/view/${attachment.id}/${attachment.cgImageId}`}
              // onClick={() => context.setSelected(index)}
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
