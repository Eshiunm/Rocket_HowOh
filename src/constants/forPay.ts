const waterBill = [
  {
    type: "water",
    id: "customized",
    title: "自訂（隨房租繳納）",
  },
  {
    type: "water",
    id: "government",
    title: "依台水計價",
  },
  {
    type: "water",
    id: "include",
    title: "包含於房租",
  }
];

const electricBill = [
  {
    type: "electric",
    id: "customized",
    title: "自訂（隨房租繳納）",
  },
  {
    type: "electric",
    id: "government",
    title: "依台水計價",
  }
];

const managementFee = [
  {
    type: "management",
    id: "none",
    title: "無管理費",
  },
  {
    type: "management",
    id: "include",
    title: "包含於租金",
  },
  {
    type: "management",
    id: "payWithRent",
    title: "房客支付（隨房租繳納）",
  },
  {
    type: "management",
    id: "paySelf",
    title: "房客支付（自行繳納）",
  },
];

export  { waterBill, electricBill, managementFee };