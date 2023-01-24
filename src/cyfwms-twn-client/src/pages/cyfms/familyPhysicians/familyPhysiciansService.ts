import axiosInstance from "../../../library/axiosInstance";
import { FamilyPhysician } from "./familyPhysiciansDatatypes";
import type { AxiosResponse } from "axios";

// /**
//  * Callback of "Add More" button.
//  * @param event - Mouse event object
//  * @param dispatch - Redux action(s) dispatcher
//  * @param form - Form node
//  * @param participantID - Participant ID
//  * @param data - Redux store data
//  */
// export const handleAddMore: AppMouseEventHandler<HTMLButtonElement> = (
//   event,
//   dispatch: AppDispatch,
//   form: HTMLFormElement,
//   participantID: number,
//   data: Data
// ) => {
//   event.preventDefault();
//   /** Are all the records removed on the UI? */
//   const flag: boolean = data.recordsList.length > 0;
//   dispatch(
//     addMoreRecord({
//       participantId: participantID,
//       familyPhysicianId: flag
//         ? data.recordsList[data.recordsList.length - 1].familyPhysicianId
//         : 0,
//       name: flag ? form[`record_${data.recordsList.length}_Name`].value : "",
//       phone: flag ? form[`record_${data.recordsList.length}_Phone`].value : "",
//       cell: flag ? form[`record_${data.recordsList.length}_Cell`].value : "",
//       listOfMedication: flag
//         ? form[`record_${data.recordsList.length}_ListOfMedication`].value
//         : "",
//     })
//   );
// };

// /**
//  * Callback of onSubmit event.
//  * @param event - Form event object
//  * @param navigate - React Router navigator
//  * @param dispatch - Redux action(s) dispatcher
//  * @param participantID - Participant ID
//  * @param data - Redux store data
//  */
// export const handleSubmit: AppFormEventHandler<HTMLFormElement> = (
//   event,
//   navigate: NavigateFunction,
//   dispatch: AppDispatch,
//   participantID: number,
//   data: Data
// ) => {
//   event.preventDefault();
//   const formData: Data = {
//     recordsList: new Array<Record>(data.recordsList.length),
//   };
//   for (let index = 0; index < data.recordsList.length; ++index) {
//     formData.recordsList[index] = {
//       participantId: participantID,
//       familyPhysicianId: data.recordsList[index].familyPhysicianId,
//       name: event.currentTarget[`record_${index + 1}_Name`].value,
//       phone: event.currentTarget[`record_${index + 1}_Phone`].value,
//       cell: event.currentTarget[`record_${index + 1}_Cell`].value,
//       listOfMedication:
//         event.currentTarget[`record_${index + 1}_ListOfMedication`].value,
//     };
//   }
//   dispatch(doPost(formData))
//     .unwrap()
//     .then(() => {
//       navigate("../counselors");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const readFamilyPhysicians = async (
  participantId: number
): Promise<AxiosResponse> =>
  axiosInstance.get<FamilyPhysician>(
    `participantservice/getAllFamilyPhysicians/${participantId}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );

export const saveFamilyPhysicians = async (
  recordsList: FamilyPhysician[]
): Promise<AxiosResponse> =>
  axiosInstance.put(
    "participantservice/saveAllFamilyPhysicians/",
    recordsList,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );

export const removeFamilyPhysician = async (
  familyPhysicianId: number
): Promise<AxiosResponse> =>
  axiosInstance.delete(
    `participantservice/removeAddMoreFamilyPhysician/${familyPhysicianId}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );
