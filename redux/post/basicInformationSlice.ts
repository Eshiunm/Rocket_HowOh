import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData:{
    name: "",
    city: "高雄市",
    district: "新興區",
    road: "",
    lane: "",
    alley: "",
    number: "",
    floor: "",
    floorTotal: "",
    type: "整層住家",
    ping: "",
    roomNumbers: "",
    livingRoomNumbers: "",
    bathRoomNumbers: "",
    balconyNumbers: "",
    parkingSpaceNumbers: ""
  }
}

export const basicInformationSlice = createSlice({
  name: "basicInformation",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = {...action.payload};
    },
    resetBasicInformation: () => initialState
  },
});

export const { setFormData, resetBasicInformation } = basicInformationSlice.actions;
export default basicInformationSlice.reducer;