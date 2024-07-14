import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: {
    rent: "",
    securityDeposit: "兩個月",
    paymentMethodOfWaterBill: "包含於房租",
    waterBillPerMonth: "",
    electricBill: "依台電計價",
    electricBillPerDegree: "",
    paymentMethodOfElectricBill: "自行繳納",
    paymentMethodOfManagementFee: "無管理費",
    managementFeePerMonth: "",
  },
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = {...action.payload};
    },
    resetExpenses: () => initialState,
  },
});

export const { setExpenses, resetExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;