// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import type { ReactElement } from "react";
// import { Link, useParams } from "react-router-dom";
// import { readCpa } from "../culturalProgramOrActivity/Servcie";
// import { CPALabel, CPALabelWithDate } from "../../../library/labels/cpa";

// const CpaViewPage = (): ReactElement => {
//   const [data, setData] = useState({});
//   const { id } = useParams();
//   useEffect(() => {
//     readCpa(Number(id)).then(({ data }) => {
//       setData(data);
//     });
//   }, []);
//   console.log("data: ", data);
//   return (
//     <TableContainer
//       sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
//     >
//       <Table sx={{ maxWidth: 900 }} aria-label="contact data table">
//         {Object.keys(data).length === 13 && (
//           <TableBody
//             sx={{ "& > tr > td": { border: 0, p: 0, paddingLeft: 5 } }}
//           >
//             {Object.entries(data).map((t: any, k: any) => {
//               if (k !== 0 && k !== 1 && t[1] !== "") {
//                 return (
//                   <TableRow key={Math.random() * 1000}>
//                     <TableCell
//                       sx={{
//                         display: "flex",
//                         width: "50%",
//                         alignContent: "start",
//                         fontWeight: "bold",
//                         fontSize: "1rem",
//                       }}
//                     >
//                       {t[0]
//                         .replace(/([A-Z])/g, " $1")
//                         // uppercase the first character
//                         .replace(/^./, function (str: String) {
//                           return str.toUpperCase();
//                         })}
//                     </TableCell>
//                     <TableCell width="50%">
//                       <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
//                         {t[1]}
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 );
//               }
//               return <></>;
//             })}
//           </TableBody>
//         )}
//         {Object.keys(data).length === 14 && (
//           <TableBody
//             sx={{ "& > tr > td": { border: 0, p: 0, paddingLeft: 16 } }}
//           >
//             {Object.entries(data).map((t: any, k: any) => {
//               if (k !== 0 && k !== 1 && t[1] !== "") {
//                 return (
//                   <TableRow key={Math.random() * 1000}>
//                     <TableCell
//                       sx={{
//                         display: "flex",
//                         width: "50%",
//                         alignContent: "start",
//                         fontWeight: "bold",
//                         fontSize: "1rem",
//                       }}
//                     >
//                       {CPALabel[k]}
//                     </TableCell>
//                     <TableCell width="50%">
//                       <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
//                         {t[1]}
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 );
//               }
//               return <></>;
//             })}
//           </TableBody>
//         )}
//       </Table>
//     </TableContainer>
//   );
// };

// export default CpaViewPage;

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import { readCpa } from "../culturalProgramOrActivity/Servcie";
import { CPALabel, CPALabelWithDate } from "../../../library/labels/cpa";

const CpaViewPage = (props: any): ReactElement => {
  const handleLink = () => {};
  const [data, setStatus] = useState({});
  const { id } = useParams();
  useEffect(() => {
    readCpa(Number(id)).then(({ data }) => {
      setStatus(data);
    });
  }, []);
  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="contact data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.keys(data).length === 14 && (
            <TableBody
              sx={{ "& > tr > td": { border: 0, p: 0, paddingLeft: 16 } }}
            >
              {Object.entries(data).map((t: any, k: any) => {
                if (k !== 0 && k !== 1 && t[1] !== "") {
                  return (
                    <TableRow key={Math.random() * 1000}>
                      <TableCell
                        sx={{
                          display: "flex",
                          width: "50%",
                          alignContent: "start",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {CPALabelWithDate[k]}
                      </TableCell>
                      <TableCell width="50%">
                        <Typography
                          component="p"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {t[1]}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                }
                return <></>;
              })}
            </TableBody>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CpaViewPage;
