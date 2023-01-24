import axiosInstance from "../../../library/axiosInstance";
import type { HouseholdMember } from "./householdMembersDatatypes";
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
//   const flag = data.recordsList.length > 0;
//   dispatch(
//     addMoreRecord({
//       participantId: participantID,
//       householdMemberId: flag
//         ? data.recordsList[data.recordsList.length - 1].householdMemberId
//         : 0,
//       name: flag ? form[`record_${data.recordsList.length}_Name`].value : "",
//       gender: flag
//         ? form[`record_${data.recordsList.length}_Gender`].value
//         : "",
//       dateOfBirth: flag
//         ? form[`record_${data.recordsList.length}_DateOfBirth`].value
//         : "",
//       relationship: flag
//         ? form[`record_${data.recordsList.length}_Relationship`].value
//         : "",
//       residing: flag
//         ? form[`record_${data.recordsList.length}_Residing`].value
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
//       householdMemberId: data.recordsList[index].householdMemberId,
//       name: event.currentTarget[`record_${index + 1}_Name`].value,
//       gender: event.currentTarget[`record_${index + 1}_Gender`].value,
//       dateOfBirth: event.currentTarget[`record_${index + 1}_DateOfBirth`].value,
//       relationship:
//         event.currentTarget[`record_${index + 1}_Relationship`].value,
//       residing: event.currentTarget[`record_${index + 1}_Residing`].value,
//     };
//   }
//   dispatch(doPost(formData))
//     .unwrap()
//     .then(() => {
//       navigate("../education_and_employment");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const readHouseholdMembers = async (
  participantId: number
): Promise<AxiosResponse> =>
  axiosInstance.get<HouseholdMember>(
    `participantservice/getAllHouseholdMembers/${participantId}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );

export const saveHouseholdMembers = async (
  recordsList: HouseholdMember[]
): Promise<AxiosResponse> =>
  axiosInstance.put<HouseholdMember>(
    "participantservice/saveAllHouseholdMembers/",
    recordsList,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );

export const removeHouseholdMember = async (
  householdMemberId: number
): Promise<AxiosResponse> =>
  axiosInstance.delete(
    `participantservice/removeAddMoreHouseholdMember/${householdMemberId}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );
