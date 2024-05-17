const waterBill = [
  {
    id: "customWater",
    title: "自訂（隨房租繳納）",
    value: "自訂"
  },
  {
    id: "waterInRent",
    title: "包含於房租",
    value: "包含於房租",
  },
  {
    id: "governmentWater",
    title: "依台水計價",
    value: "依台水計價",
  },
];

const electricBill = [
  {
    id: "customElectric",
    title: "自訂（隨房租繳納）",
    value: "自訂",
  },
  {
    id: "governmentElectric",
    title: "依台電計價",
    value: "依台電計價",
  }
];

const managementFee = [
  {
    type: "paymentMethodOfManagementFee",
    id: "noManagementFee",
    title: "無管理費",
    value: "無管理費",
  },
  {
    type: "paymentMethodOfManagementFee",
    id: "managementFeeInRent",
    title: "包含於租金",
    value: "包含於租金",
  },
  {
    type: "paymentMethodOfManagementFee",
    id: "managementFeePayWithRent",
    title: "房客支付（隨房租繳納）",
    value: "隨房租繳納",
  },
  {
    type: "paymentMethodOfManagementFee",
    id: "managementFeePaySelf",
    title: "房客支付（自行繳納）",
    value: "自行繳納",
  },
];

export  { waterBill, electricBill, managementFee };