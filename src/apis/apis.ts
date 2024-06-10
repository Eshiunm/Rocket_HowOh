import axios from 'axios';

const getToken = () => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  return config;
};

// 登入登出、密碼變更相關的 api
const baseRequest = axios.create({
  //baseURL: 'http://98.70.102.116/api'
  baseURL: '/api'
});
// 註冊相關的 api
const registerRequest = axios.create({
  // baseURL: 'http://98.70.102.116/api/register'
  baseURL: '/api/register'
});
// 房源相關的 api
const houseRequest = axios.create({
  //baseURL: 'http://98.70.102.116/api/house'
  baseURL: '/api/house'
});
// 租賃相關的 api
const orderRequest = axios.create({
  // baseURL: 'http://98.70.102.116/api/order'
  baseURL: '/api/order'
});
// 預約相關的 api
const appointmentRequest = axios.create({
  // baseURL: 'http://98.70.102.116/api/appointment'
  baseURL: '/api/appointment'
});
// 租客身分比對相關的 api
const userRequest = axios.create({
  // baseURL: 'http://98.70.102.116/api/user'
  baseURL: '/api/user'
});
// 評價相關的 api
const commentRequest = axios.create({
  // baseURL: 'http://98.70.102.116/api/comment'
  baseURL: '/api/comment'
});


// 登入登出-相關的 api
export const apiLogin = (data: any) => baseRequest.post('/login', data); // FCL-1
export const apiLogOut = () => baseRequest.post('/logout'); // FCL-2
export const apiPasswordChange = (data: any) => baseRequest.patch('/password', data); // FCL-4

// 註冊-共用相關的 api
export const apiRegisterSignUp = (data: any) => registerRequest.post('/common/signup', data); // FCR-1
export const apiRegisterPhoneNumberVerifi = (data: any) => registerRequest.post('/common/phoneNumberVerifi', data); // FCR-2

// 房源-房東刊登房源相關的 api
export const apiHouseLandlordPostNew = (data:any) => houseRequest.post('/landlord',data,getToken()); // ALO-2
export const apiHouseLandlordPostStep = (data: any, houseId: string|null) => houseRequest.patch(`/landlord/${houseId}`, data, getToken()); // ALO-3
export const apiHouseLandlordPostImg = (data: any, houseId: string|null) => houseRequest.post(`/landlord/img/${houseId}`, data, getToken()); // ALO-4
export const apiHouseLandlordPostDelete = (houseId: string|null) => houseRequest.delete(`/landlord/${houseId}`, getToken()); // ALO-11

// 房源-房東房源管理相關的 api
export const apiHouseLandlordList = () => houseRequest.get('/landlord/list',getToken()); // ALO-1
export const apiHouseLandlordSingleInfo = (houseId: string|undefined) => houseRequest.get(`/landlord/info/${houseId}`,getToken()); // ALO-12、ALO-13、ALO-14、ALO-15
export const apiHouseLandlordUnratedCount = () => houseRequest.get('/landlord/count/unrated', getToken()); // ALO-10

// 房源-房東更改房源狀態相關的 api
export const apiHouseLandlordFindUser = (tenantPhone: string) => houseRequest.post('/landlord/userInfo', tenantPhone, getToken()); // ALO-9
export const apiHouseLandlordChangeFinish = (houseId: string|null) => houseRequest.patch(`/landlord/status/${houseId}`, {}, getToken()); // ALO-6

// 房源-搜尋頁面相關的 api
export const apiHouseCommonSingleInfo = (id: string) => houseRequest.get(`/common/info/${id}`,getToken()); // FCO-3
export const apiHouseCommonSearchList = (querystring: string) => houseRequest.get(`/common/list/search?${querystring}`); // FCO-2 帶入 querystring
export const apiHouseCommonRecommendedList = () => houseRequest.get('/common/list'); // FCO-1
export const apiHouseCommonListCount = () => houseRequest.get('/common/totalNumber'); // FCO-4

// 租賃-房東合約相關的 api
export const apiOrderViewPublishHouseContract = (houseId: string | undefined) => orderRequest.get(`/landlord/viewHouseContract/${houseId}`, {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
  responseType: 'blob',
}); // ALO-19


// 租賃-房東出租歷史相關的 api
export const apiOrderLandlordListExpired = (querystring: string) => orderRequest.get(`/landlord/list/expired?${querystring}`,getToken()); // ALH-1 
export const apiOrderLandlordContractInfo = (orderId: number) => orderRequest.get(`/landlord/contractInfo/${orderId}`,getToken()); // ALH-2

// 租賃-房東更改為已出租相關的 api
export const apiOrderLandlordAssignTenant = (userInfo: any) => orderRequest.post('/landlord/userInfo', userInfo, getToken()); // ALO-5、ALO-8

// 租賃-租客相關的 api
export const apiOrderTenantListExpired = () => orderRequest.get('/tenant/list/expired'); // ATH-2
export const apiOrderTenantListRenting = () => orderRequest.get('/tenant/list/renting'); // ATH-1

// 預約-房東取得租客資訊相關的 api
export const apiAppointmentLandlordSingleInfo = (appointmentId: number) => appointmentRequest.get(`/landlord/${appointmentId}`,getToken()); // ALA-1
export const apiAppointmentLandlordHiddenTenant = (appointmentId: number) => appointmentRequest.patch(`/landlord/hidden/${appointmentId}`,getToken()); // ALA-2

// 預約-租客相關的 api
export const apiAppointmentTenantInvitedList = () => appointmentRequest.get('/tenant/list/invited'); // ATA-1
export const apiAppointmentTenantInvitedHouseDetail = (id: string) => appointmentRequest.get(`/tenant/invited/${id}`); // ATA-2
export const apiAppointmentTenantHouseDetail = (id: string) => appointmentRequest.get(`/tenant/${id}`); // ATA-3

// 預約-共用相關的 api
export const apiAppointmentCommonList = (querystring: string) => appointmentRequest.get(`/common/list?${querystring}`,getToken()); // ACA-1
export const apiAppointmentCommonTotalNumber = (querystring: string) => appointmentRequest.get(`/common/totalNumber?${querystring}`,getToken()); // ACA-2 

// 租客身分比對相關的 api
export const apiUserInfoCompare = (houseId: string) => userRequest.get(`/tenant/info/match/${houseId}`,getToken()); // FTU-2
export const apiUserInfoGet = () => userRequest.get('/tenant/info',getToken()); // FTU-1

// 評價-共用相關的 api
export const apiCommentPost = (data: any) => commentRequest.post('/common', data); // ACC-5
export const apiCommentList = () => commentRequest.get('/common/list/all'); // ACC-1
export const apiCommentOthersList = () => commentRequest.get('/common/list/others'); // ACC-4
export const apiCommentMyList = () => commentRequest.get('/common/list/mine'); // ACC-3
export const apiCommentUnratedList = () => commentRequest.get('/common/list/unrated'); // ACC-2
export const apiCommentReply = (data: any) => commentRequest.post('/common/reply', data); // ACC-6