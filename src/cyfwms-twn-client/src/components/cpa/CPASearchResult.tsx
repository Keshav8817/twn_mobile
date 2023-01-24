// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import { Link } from "react-router-dom";

// import type { ReactElement } from "react";
// import { Record } from "../../features/cpa/search/slice";
// import { useAppDispatch, useAppSelector } from "../../library/hooks";
// import { doGet as culturalProgramActivity } from "../../features/cpa/culturalProgramActivity/slice";
// import { setView } from "../../features/popupSlice";
// import EditIcon from "./EditIcon";
// import {
//   doGet as CPAGetParticipant,
//   doSearch,
// } from "../../features/cpa/participant/slice";
// import { doGet as CPAGetAttachments } from "../../features/cpa/attachments/slice";

// const CPASearchResult = (): ReactElement => {
//   const dispatch = useAppDispatch();
//   const data = useAppSelector((state) => state.cpaSearch.data);

//   const handleSearchView = (id: any) => {
//     dispatch(setView(true));
//     dispatch(culturalProgramActivity(id));
//     dispatch(culturalProgramActivity(id)).then((res: any) => {
//       dispatch(doSearch(res.payload.culturalProgramId))
//         .unwrap()
//         .catch((err) => {});
//     });

//     dispatch(CPAGetParticipant(id));
//     dispatch(CPAGetAttachments(id));
//   };
//   return (
//     <Box>
//       <Typography fontSize={20} fontWeight={800} color="red" paddingLeft={2}>
//         Total Results - {data.length}
//       </Typography>
//       <Table sx={{ minWidth: 800 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Reference ID</TableCell>
//             <TableCell> Name</TableCell>
//             <TableCell>Type</TableCell>
//             <TableCell>Caseworker</TableCell>
//             <TableCell>Status</TableCell>

//             <TableCell>Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((participant: Record) => (
//             <TableRow
//               key={Math.random() * 1000}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell>
//                 <Link
//                   to={`/cpa/view/${participant.culturalProgramId}`}
//                   onClick={() => {
//                     handleSearchView(participant.culturalProgramId);
//                   }}
//                 >
//                   {participant.referenceId}
//                 </Link>
//               </TableCell>

//               <TableCell>{participant.name}</TableCell>
//               <TableCell>{participant.type}</TableCell>
//               <TableCell>{participant.caseworker}</TableCell>
//               <TableCell>{participant.status}</TableCell>

//               <TableCell>
//                 <EditIcon value={participant.culturalProgramId} />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// };

// export default CPASearchResult;
import React from "react";

export const CPASearchResult = () => {
  return <div>CPASearchResult</div>;
};
