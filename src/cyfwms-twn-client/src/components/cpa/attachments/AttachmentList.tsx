// // import AttachmentsContext from "../../../contexts/AttachmentsContext";
// // import { TableCell, TableRow } from "@mui/material";
// // import React, { useContext } from "react";
// // import { Link } from "react-router-dom";
// // import type { Record as RecordT } from "../../../features/cpa/attachments/slice";
// // import type { FC } from "react";

// // /**
// //  * `AttachmentList` FC is used to list attachments of
// //  * `CPA` aka `Cultural Programs and Activities` module.
// //  * @param props
// //  * @returns `ReactElement`
// //  */
// // const AttachmentList: FC<AppRecordListProps<RecordT>> = (props) => {
// //   const context = useContext(AttachmentsContext);
// //   return (
// //     <>
// //       {props.list.map((attachment, index) => (
// //         <TableRow key={Math.random() * 1000}>
// //           <TableCell>
// //             <Link to="view" onClick={() => context.setSelected(index)}>
// //               Select
// //             </Link>
// //           </TableCell>
// //           <TableCell>{attachment.name}</TableCell>
// //           <TableCell>{attachment.type}</TableCell>
// //         </TableRow>
// //       ))}
// //     </>
// //   );
// // };

// // export default AttachmentList;

// // import React from "react";

// // export const AttachmentList = () => {
// //   return <div>AttachmentList</div>;
// // };

// import AttachmentsContext from "../../../contexts/AttachmentsContext";
// import { TableCell, TableRow } from "@mui/material";
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// // import type { Record as RecordT } from "../../../features/initialContact/attachments/slice";
// import type { FC } from "react";

// /**
//  * `AttachmentList` is used to list attachments of `IC` aka \
//  * `Initial Contact` module.
//  * @param props
//  * @returns `ReactElement`
//  */
// const AttachmentList: FC<AppRecordListProps<any>> = (props) => {
//   const context = useContext(AttachmentsContext);

//   console.log(props);
//   return (
//     <>
//       {props.list.map((attachment, index) => (
//         <TableRow key={Math.random() * 1000}>
//           <TableCell sx={{ color: "black" }} align="center" size="small">
//             <Link
//               to={`view/${attachment.icAttachmentId}`}
//               //onClick={() => context.setSelected(attachment.icAttachmentId)}
//             >
//               Select
//             </Link>
//           </TableCell>
//           <TableCell sx={{ color: "black" }} align="center" size="small">
//             {attachment.name}
//           </TableCell>
//           <TableCell sx={{ color: "black" }} align="center" size="small">
//             {attachment.type}
//           </TableCell>
//         </TableRow>
//       ))}
//     </>
//   );
// };

// export default AttachmentList;

import AttachmentsContext from "../../../contexts/AttachmentsContext";
import { TableCell, TableRow } from "@mui/material";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
// import type { Record as RecordT } from "../../../features/initialContact/attachments/slice";
import type { FC } from "react";

/**
 * `AttachmentList` is used to list attachments of `IC` aka \
 * `Initial Contact` module.
 * @param props
 * @returns `ReactElement`
 */
const AttachmentList: FC<AppRecordListProps<any>> = (props) => {
  const context = useContext(AttachmentsContext);
  const { id } = useParams();
  console.log(props);
  return (
    <>
      {props.list.map((attachment, index) => (
        <TableRow key={Math.random() * 1000}>
          <TableCell sx={{ color: "black" }} align="center" size="small">
            <Link
              to={`../attachments/view/${attachment.culturalProgramId}/${attachment.culturalProgImageId}`}
              //onClick={() => context.setSelected(attachment.icAttachmentId)}
            >
              Select
            </Link>
          </TableCell>
          <TableCell sx={{ color: "black" }} align="center" size="small">
            {attachment.name}
          </TableCell>
          <TableCell sx={{ color: "black" }} align="center" size="small">
            {attachment.type}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default AttachmentList;
