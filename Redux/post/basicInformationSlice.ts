import { createSlice } from "@reduxjs/toolkit";

export const basicInformationSlice = createSlice({
  name: "basicInformation",
  initialState: {
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
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = {...action.payload};
    },
  },
});

export const { setFormData } = basicInformationSlice.actions;
export default basicInformationSlice.reducer;