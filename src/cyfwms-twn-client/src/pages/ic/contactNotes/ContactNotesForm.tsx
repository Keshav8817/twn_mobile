// import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
// import Dropdown from "../../../components/Dropdown";
// import Input from "../../../components/Input";
// import TextArea from "../../../components/TextArea";
// import EditIcon from "../../../components/initialContact/contactNotes/EditIcon";
// import {
//   Data,
//   doPost,
//   doSearch,
// } from "../../../features/initialContact/contactNotes/slice";
// import { onKeyDown } from "../../../library/app";
// import { useAppDispatch, useAppSelector } from "../../../library/hooks";
// import { Box } from "@mui/material";
// import React from "react";
// import type { FC, FormEvent } from "react";

// const ContactNotesForm: FC<any> = ({
//   setAddNew,
//   setDisabled,
//   disabled,
//   targetValue,
// }) => {
//   const dispatch = useAppDispatch();
//   const state = useAppSelector((state) => state.icFileDetails);
//   const { contactMethod } = useAppSelector((state) => state.codetable);
//   const data = useAppSelector((state) => state.icContactNotes.data);

//   const submitHandler = (e: FormEvent) => {
//     e.preventDefault();
//     const form = e.currentTarget as HTMLFormElement;
//     const formData: Data = {
//       fileDetailsId: state.getData.fileDetailsId,
//       contactNotesId: data.contactNotesId,
//       name: form.naam.value,
//       worker: form.worker.value,
//       date: form.date.value,
//       time: form.time.value,
//       contactMethod: form.contactMethod.value,
//       needAddress: form.address.value,
//       summary: form.summary.value,
//       result: form.result.value,
//       nextStep: form.nextStep.value,
//       casePlanProgress: form.progress.value,
//       additionalInformation: form.information.value,
//     };
//     dispatch(doPost(formData))
//       .unwrap()
//       .then(() => {
//         console.log("IcContactNotes POST backend API was successful!");
//         dispatch(doSearch({ id: state.getData.fileDetailsId, data: "" }));
//         setAddNew(false);
//       })
//       .catch((err) => {
//         console.log("IcContactNotes POST backend API didn't work!");
//         console.log(err);
//       });
//   };
//   return (
//     <Box
//       component="form"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem 0",
//       }}
//       onSubmit={submitHandler}
//       onKeyDown={onKeyDown}
//     >
//       {disabled && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//           }}
//         >
//           <EditIcon
//             setDisabled={setDisabled}
//             setAddNew={setAddNew}
//             contactId={data.contactNotesId}
//             targetValue={targetValue}
//           />
//         </Box>
//       )}
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
//         <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
//           <Input
//             id="naam"
//             value="Name"
//             required
//             autofill={data.name}
//             readOnly={disabled}
//           />
//         </Box>
//         <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
//           <Input
//             id="worker"
//             value="Worker"
//             required
//             autofill={data.worker}
//             readOnly={disabled}
//           />
//         </Box>
//       </Box>
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
//         <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
//           <Input
//             id="date"
//             value="Date"
//             type="date"
//             required
//             readOnly={disabled}
//             autofill={data.date}
//             maxDate={new Date().toISOString().substring(0, 10)}
//             minDate="1900-01-01"
//           />
//         </Box>
//         <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
//           <Input
//             id="time"
//             value="Time"
//             type="time"
//             autofill={data.time}
//             readOnly={disabled}
//           />
//         </Box>
//       </Box>
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
//         <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
//           <Dropdown
//             id="contactMethod"
//             value="Contact Method"
//             autofill={data.contactMethod}
//             disabled={disabled}
//             optionsList={Object.values(contactMethod).map(
//               (status: any) => status.en
//             )}
//           />
//         </Box>
//         <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
//       </Box>
//       <TextArea
//         formLabelFlex="1 1 0"
//         outlinedInputFlex="5.3 1 0"
//         id="address"
//         value="Need(s) Addressed"
//         autofill={data.needAddress}
//         readOnly={disabled}
//       />
//       <TextArea
//         formLabelFlex="1 1 0"
//         outlinedInputFlex="5.3 1 0"
//         id="summary"
//         value="Summary"
//         autofill={data.summary}
//         readOnly={disabled}
//       />
//       <TextArea
//         formLabelFlex="1 1 0"
//         outlinedInputFlex="5.3 1 0"
//         id="result"
//         value="Results"
//         autofill={data.result}
//         readOnly={disabled}
//       />
//       <TextArea
//         formLabelFlex="1 1 0"
//         outlinedInputFlex="5.3 1 0"
//         id="nextStep"
//         value="Next Step(s)"
//         autofill={data.nextStep}
//         readOnly={disabled}
//       />
//       <TextArea
//         formLabelFlex="1 1 0"
//         outlinedInputFlex="5.3 1 0"
//         id="progress"
//         value="Progress towards Case Plan"
//         autofill={data.casePlanProgress}
//         readOnly={disabled}
//       />
//       <TextArea
//         formLabelFlex="1 1 0"
//         outlinedInputFlex="5.3 1 0"
//         id="information"
//         value="Additional Information"
//         autofill={data.additionalInformation}
//         readOnly={disabled}
//       />
//       <Box sx={{ display: "flex", justifyContent: "right" }}>
//         <CYFSWMSNextButton disabled={disabled} />
//       </Box>
//     </Box>
//   );
// };

// export default ContactNotesForm;
export default null;
