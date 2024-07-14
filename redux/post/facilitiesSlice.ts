import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  facilities: {
    isRentSubsidy: false,
    isCookAllowed: false,
    isPetAllowed: false,
    isSTRAllowed: false,
    isNearByDepartmentStore: false,
    isNearBySchool: false, 
    isNearByMorningMarket: false, 
    isNearByNightMarket: false, 
    isNearByConvenientStore: false, 
    isNearByPark: false, 
    hasGarbageDisposal: false, 
    hasWindowInBathroom: false, 
    hasElevator: false, 
    hasAirConditioner: false, 
    hasWashingMachine: false, 
    hasRefrigerator: false, 
    hasCloset: false, 
    hasTableAndChair: false, 
    hasWaterHeater: false, 
    hasInternet: false, 
    hasBed: false, 
    hasTV: false, 
    isNearMRT: false, 
    kmAwayMRT: "", 
    isNearLRT: false, 
    kmAwayLRT: "", 
    isNearBusStation: false, 
    kmAwayBusStation: "", 
    isNearHSR: false, 
    kmAwayHSR: "", 
    isNearTrainStation: false, 
    kmAwayTrainStation: "",
  },
}

export const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    setFacilities: (state, action) => {
      state.facilities = {...action.payload};
    },
    resetFacilities: () => initialState
  },
});

export const { setFacilities, resetFacilities } = facilitiesSlice.actions;
export default facilitiesSlice.reducer;