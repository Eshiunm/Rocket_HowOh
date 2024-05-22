import axios from 'axios';

// 登入登出、密碼變更相關的 api
const baseRequest = axios.create({
  baseURL: 'http://98.70.102.116/api'
});
// 註冊相關的 api
const registerRequest = axios.create({
  baseURL: 'http://98.70.102.116/api/register'
});
// 房源相關的 api
const houseRequest = axios.create({
  baseURL: 'http://98.70.102.116/api/house'
});
// 租賃相關的 api
const orderRequest = axios.create({
  baseURL: 'http://98.70.102.116/api/order'
});
// 預約相關的 api
const appointmentRequest = axios.create({
  baseURL: 'http://98.70.102.116/api/appointment'
});
// 租客身分比對相關的 api
const userRequest = axios.create({
  baseURL: 'http://98.70.102.116/api/user'
});
// 評價相關的 api
const commentRequest = axios.create({
  baseURL: 'http://98.70.102.116/api/comment'
});


// 登入登出-相關的 api
export const apiSignUp = (data: any) => baseRequest.post('/login', data); // FCL-1
export const apiLogOut = () => baseRequest.post('/logout'); // FCL-2
export const apiPasswordChange = (data: any) => baseRequest.patch('/password', data); // FCL-4

// 註冊-共用相關的 api
export const apiRegisterSignUp = (data: any) => registerRequest.post('/common/signup', data); // FCR-1
export const apiRegisterPhoneNumberVerifi = (data: any) => registerRequest.post('/common/phoneNumberVerifi', data); // FCR-2

// 房源-房東相關的 api
export const apiHouseLandlordPostStep = (data: any, id: string) => houseRequest.patch(`/landlord/${id}`, data); // ALO-3
export const apiHouseLandlordPostNew = () => houseRequest.post('/landlord'); // ALO-2
export const apiHouseLandlordList = () => houseRequest.get('/landlord/list'); // ALO-1
export const apiHouseLandlordContract = () => houseRequest.get('/landlord/contract'); // ALO-16
export const apiHouseLandlordSingleContract = (id: string) => houseRequest.post(`/landlord/contract/${id}`); // ALO-7
export const apiHouseLandlordChangeStatus = (id: string) => houseRequest.patch(`/landlord/status/${id}`); // ALO-6
export const apiHouseLandlordAddTenant = (data: any) => houseRequest.post('/landlord/userinfo', data); // ALO-5
export const apiHouseLandlordPostImg = (data: any, id: string) => houseRequest.post(`/landlord/img/${id}`, data); // ALO-4
export const apiHouseLandlordSingleInfo = (id: string) => houseRequest.get(`/landlord/info/${id}`); // ALO-15、ALO-14、ALO-13、ALO-12
export const apiHouseLandlordPostDelete = (id: string) => houseRequest.delete(`/landlord/${id}`); // ALO-11
export const apiHouseLandlordUnratedCount = () => houseRequest.get('/landlord/count/unrated'); // ALO-10
export const apiHouseLandlordFindUser = (data: any) => houseRequest.post('/landlord/userinfo', data); // ALO-9
export const apiHouseLandlordForceChange = (data: any) => houseRequest.post('/landlord/userinfo', data); // ALO-8

// 房源-搜尋頁面相關的 api
export const apiHouseCommonSingleInfo = (id: string) => houseRequest.get(`/common/info/${id}`); // FCO-3
export const apiHouseCommonSearchList = () => houseRequest.get('/common/list'); // FCO-2 帶入 querystring
export const apiHouseCommonRecommendedList = () => houseRequest.get('/common/list'); // FCO-1
export const apiHouseCommonListCount = () => houseRequest.get('/common/totalNumber'); // FCO-4

// 租賃-房東相關的 api
export const apiOrderLandlordListExpired = () => orderRequest.get('/landlord/list/expired'); // ALH-1

// 租賃-租客相關的 api
export const apiOrderTenantListExpired = () => orderRequest.get('/tenant/list/expired'); // ATH-2
export const apiOrderTenantListRenting = () => orderRequest.get('/tenant/list/renting'); // ATH-1

// 預約-房東相關的 api
export const apiAppointmentLandlordTenantList = (id: string) => appointmentRequest.get(`/landlord/${id}`); // ALA-1

// 預約-租客相關的 api
export const apiAppointmentTenantInvitedList = () => appointmentRequest.get('/tenant/list/invited'); // ATA-1
export const apiAppointmentTenantInvitedHouseDetail = (id: string) => appointmentRequest.get(`/tenant/invited/${id}`); // ATA-2
export const apiAppointmentTenantHouseDetail = (id: string) => appointmentRequest.get(`/tenant/${id}`); // ATA-3

// 預約-共用相關的 api
export const apiAppointmentCommonList = (id: string) => appointmentRequest.get(`/common/list/${id}`); // ACA-1

// 租客身分比對相關的 api
export const apiUserInfoCompare = (id: string) => userRequest.get(`/tenant/info/${id}`); // FTU-2
export const apiUserInfoGet = () => userRequest.get('/tenant/info'); // FTU-1

// 評價-共用相關的 api
export const apiCommentPost = (data: any) => commentRequest.post('/common', data); // ACC-5
export const apiCommentList = () => commentRequest.get('/common/list/all'); // ACC-1
export const apiCommentOthersList = () => commentRequest.get('/common/list/others'); // ACC-4
export const apiCommentMyList = () => commentRequest.get('/common/list/mine'); // ACC-3
export const apiCommentUnratedList = () => commentRequest.get('/common/list/unrated'); // ACC-2
export const apiCommentReply = (data: any) => commentRequest.post('/common/reply', data); // ACC-6