import { useState, useContext } from "react";
import { Tooltip, Drawer, Flowbite, CustomFlowbiteTheme } from "flowbite-react";
import rightIcon_black from "../../../assets/imgs/icons/rightIcon_black.svg";
import close from "../../../assets/imgs/icons/close.svg";
import star from "../../../assets/imgs/icons/star.svg";
import { RequestListType } from "../request/RequestList";
// 轉換承租時間
import moment from 'moment-timezone';
import { apiAppointmentLandlordHiddenTenant, apiAppointmentLandlordRevealTenant, apiAppointmentLandlordSingleInfo } from "../../../apis/apis";
import { ReloadRequestList } from "../../../pages/landlordManagement/TenantRequest";

type TenantInfoType = {
  lastName: string; //租客名
  firstName: string; //租客姓
  job: string; //租客職業
  gender: string; //租客性別
  phonenumber: string; //租客手機
  intro: string; //租客自介
  photo: string; //租客照片
};

type TenantRatingInfoType = {
  Sum: number; //分數總和
  Count: number; //評價筆數
  Average: number//平均分數
};

type RatingUserInfoType = {
  userLastName: string; //房東名
  userFirstName: string; //房東姓
  userGender: string; //房東性別
  userJob: string //房東職業
}

type ReplyInfo = {
  //針對評分的回覆: 租客評語的版本
  orderRatingId: number; //評分Id
  commentUserRole: string; //租客評語
  userInfo: null; //由於屬於[租客評語]，因此不帶入使用者資訊
  replyComment: string; //租客評論內容
  date: string //回覆評論時間
};

type RatingListType = {
  orderRatingId: number; //評分資料Id
  ratingRole: string; //房東評分
  orderRating: number; //評分
  ratingDate: string; //評價日期
  ratingComment: string; //房東評價內容
  ratingUserInfo: RatingUserInfoType[];
  replyInfo : ReplyInfo[]
};

type OrderInfoType = {
  orderId: number; //訂單Id
  ratingList: RatingListType[];
} ;

type TenantDetailsType = {
  tenantId: number; //租客User Id
  tenantInfo: TenantInfoType[];
  tenantRatingInfo: TenantRatingInfoType;
  orderList: {
    orderInfo: OrderInfoType[]
  }
};

type RequestCardPropsType = {
  data: RequestListType;
  status: string;
  isHidden: boolean;
}

export default function RequestCard({data, status = "none", isHidden}: RequestCardPropsType) {
  const customTheme: CustomFlowbiteTheme = {
    drawer: {
      "root": {
        "base": "bg-Neutral-99 fixed z-40 overflow-y-auto px-10 pt-10 transition-transform",
        "backdrop": "fixed inset-0 z-30 bg-transparent",
        "edge": "bottom-16",
        "position": {
          "right": {
            "on": "shadow-elevation-3 right-0 top-[64px] bottom-0 w-5/12 transform-none scrollbar-hide",
            "off": "right-0 top-[152px] h-screen w-5/12 translate-x-full"
          },
        }
      },
      "header": {
        "inner": {
          "closeButton": "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
          "closeIcon": "h-4 w-4",
          "titleIcon": "me-2.5 h-4 w-4",
          "titleText": "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
        },
        "collapsed": {
          "on": "hidden",
          "off": "block"
        }
      },
      "items": {
        "base": ""
      }
    }
  };

  const {setReloadRequestList, setShowToast} = useContext(ReloadRequestList);
  const [isOpen, setIsOpen] = useState(false);
  // const [showToast, setShowToast] = useState(false)
  const [getInfoLoading, setGetInfoLoading] = useState(false);
  const [tenantDetails, setTenantDetails] = useState<TenantDetailsType | null>(null);
  const orderList = tenantDetails?.orderList?.orderInfo;
  const hasAnyRating = orderList?.filter((order: OrderInfoType) => order.ratingList.length === 1);
  const handleClose = () => setIsOpen(false);

  const { appointmentId, appointmentTime, description } = data;
  const { tenantInfo, orderInfo } = description;

  const getSingleTenantInfo = async (appointmentId: number) => {
    setGetInfoLoading(true);
    try {
      const response = await apiAppointmentLandlordSingleInfo(appointmentId);
      setTenantDetails(response.data[0]);
      setGetInfoLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = () => {
    setIsOpen(true);
    getSingleTenantInfo(appointmentId);
  };

  const handleHiddenTenant = async () => {
    try {
      if (isHidden) {
        apiAppointmentLandlordRevealTenant(appointmentId);
      } else {
        apiAppointmentLandlordHiddenTenant(appointmentId);
      }
      handleClose();
      setShowToast(true);
      setReloadRequestList(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <li
        className={`p-3 mb-4 flex gap-4 rounded-xl hover:bg-Landlord-99 ${isOpen && "bg-Landlord-95"}`}
        onClick={handleCardClick}
      >
        <div className="w-36 h-24 rounded-2xl overflow-hidden">
          <img
            src={tenantInfo.photo}
            alt={tenantInfo.lastName + tenantInfo.firstName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex gap-3 mb-4">
            <h3 className="text-sans-b-h6">{tenantInfo.lastName + tenantInfo.firstName}</h3>
            {
              status === "send" && (
                <div className="badge-s bg-Tenant-90">
                  <h5 className="pr-2 mr-2 border-r border-Tenant-70">租約邀請已送出</h5>
                  <time>{moment(orderInfo[0].createTime).tz('Asia/Taipei').format('YYYY年M月D日')}</time>
                </div>
              )
            }
            {
              status === "reject" && (
                <div className="badge-s bg-Alert-95">
                  <h5 className="pr-2 mr-2 border-r border-Tenant-70">租約邀請已拒絕</h5>
                  <time>{moment(orderInfo[0].createTime).tz('Asia/Taipei').format('YYYY年M月D日')}</time>
                </div>
              )
            }
            {
              status === "none" && false
            }
          </div>
          <div className="text-sans-body1 flex mb-2">
            <h4 className="pr-2 mr-2 border-r border-Tenant-70">{tenantInfo.gender}</h4>
            <h4>{tenantInfo.job}</h4>
          </div>
          <a
            href={`tel:+886-${tenantInfo.phoneNumber.replace(/^0/, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')}`}
            className="text-sans-body1">
            {tenantInfo.phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')}
          </a>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <Tooltip
            className="bg-Landlord-30 text-sans-body2 rounded-lg py-1 px-11 text-white text-center whitespace-pre-line"
            content={"租客申請預約時間"}
          >
            <time className="cursor-pointer">
              <span className="pr-2 mr-2 border-r border-Tenant-70">{moment(appointmentTime).tz('Asia/Taipei').format('YYYY年M月D日')}</span>
              <span>{moment(appointmentTime).format('HH:mm')}</span>
            </time>
          </Tooltip>
          <button
            type="button"
            className="mt-auto mb-1 mr-2 letter-button-light border-b border-black hover:border-Neutral-30"
          >
            查看更多
            <img src={rightIcon_black} alt="rightIcon" />
          </button>
        </div>
      </li>
      <Flowbite theme={{ theme: customTheme }}>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Items>
          <div className="layout-grid gap-4 mb-32">
            <div className="col-span-12 flex flex-col gap-6 items-end">
              <button
                type="button"
                onClick={handleClose}
              >
                <img src={close} alt="close" />
              </button>
              {
                getInfoLoading ? (
                  <>
                    <div role="status" className="w-full p-6 rounded-2xl bg-white border border-gray-200 shadow animate-pulse md:p-6">
                      <div className="flex justify-between mb-3.5">
                        <div>
                          <span className="material-symbols-outlined text-Tenant-50 mb-6">face</span>
                          <div className="h-4 bg-Neutral-95 rounded-full w-8 mb-3" />
                          <div className="h-7 bg-Neutral-95 rounded-full w-24 mb-3" />
                          <div className="h-4 bg-Neutral-99 rounded-full w-20 mb-2" />
                          <div className="h-4 bg-Neutral-99 rounded-full w-28" />
                        </div>
                        <div className="w-[186px] rounded-lg flex items-center justify-center h-40 mb-4 bg-Neutral-99">
                          <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex gap-3 mb-6">
                        <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                          <h5 className="w-full text-Tenant-50 text-sans-b-body1">評價</h5>
                          <h4 className="text-sans-h4">0</h4>
                          <img src={star} alt="star" className="self-end" />
                        </div>
                        <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                          <h5 className="w-full text-Tenant-50 text-sans-b-body1">則數</h5>
                          <h4 className="text-sans-h4">0</h4>
                          <h6 className="self-end">則</h6>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-Landlord-40 text-sans-b-body1 mb-3">自我介紹</h4>
                        <div className="h-4 bg-Neutral-99 rounded-full max-w-60 mb-2" />
                        <div className="h-4 bg-Neutral-95 rounded-full w-full mb-2" />
                        <div className="h-4 bg-Neutral-99 rounded-full max-w-72 mb-2" />
                        <div className="h-4 bg-Neutral-95 rounded-full max-w-24" />
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                ):(
                  <>
                    <button
                      type="button"
                      className="outline-button-m flex items-center gap-2"
                      onClick={handleHiddenTenant}
                    >
                      {
                        isHidden ? "顯示租客" : "隱藏租客"
                      }
                      <span className="material-symbols-outlined text-base">visibility_off</span>
                    </button>
                    <div className="w-full p-6 rounded-2xl bg-white">
                      <div className="flex justify-between mb-3.5">
                        <div>
                          <span className="material-symbols-outlined text-Tenant-50 mb-6">face</span>
                          <h4 className="text-sans-b-body1 text-Tenant-50 mb-3">租客</h4>
                          <h3 className="text-sans-b-h4 mb-3">{
                            `${tenantDetails?.tenantInfo[0].lastName}${tenantDetails?.tenantInfo[0].firstName}`
                          }</h3>
                          <div className="text-sans-body1 flex mb-2">
                            <h4 className="pr-2 mr-2 border-r border-Tenant-70">{
                              tenantDetails?.tenantInfo[0].gender
                            }</h4>
                            <h4>{
                              tenantDetails?.tenantInfo[0].job
                            }</h4>
                          </div>
                          <a
                            href={`tel:+886-${tenantDetails?.tenantInfo[0].phonenumber.replace(/^0/, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')}`}
                            className="text-sans-body1">
                            {tenantDetails?.tenantInfo[0].phonenumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')}
                          </a>
                        </div>
                        <div className="w-[186px] rounded-lg overflow-hidden">
                          <img
                            src={tenantDetails?.tenantInfo[0].photo}
                            alt="tenant"
                            className="w-full aspect-square block object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 mb-6">
                        <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                          <h5 className="w-full text-Tenant-50 text-sans-b-body1">評價</h5>
                          <h4 className="text-sans-h4">{tenantDetails?.tenantRatingInfo.Average.toFixed(1) || "尚無評價"}</h4>
                          <img src={star} alt="star" className="self-end" />
                        </div>
                        <div className="flex-1 p-4 rounded-lg bg-Neutral-95 flex gap-4 flex-wrap justify-between">
                          <h5 className="w-full text-Tenant-50 text-sans-b-body1">則數</h5>
                          <h4 className="text-sans-h4">{tenantDetails?.tenantRatingInfo.Count}</h4>
                          <h6 className="self-end">則</h6>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-Landlord-40 text-sans-b-body1 mb-3">自我介紹</h4>
                        <p className="text-sans-body1">{tenantDetails?.tenantInfo[0].intro}</p>
                      </div>
                    </div>
                    {
                      hasAnyRating?.length ? (
                        <div className="w-full">
                          <h4 className="text-sans-b-h6 mb-4">房東評價</h4>
                          {
                            hasAnyRating.map((comment, index) => {
                              const lastName = comment.ratingList[0].ratingUserInfo[0].userLastName;
                              const gender = comment.ratingList[0].ratingUserInfo[0].userGender === "男" ? "先生" : "小姐";
                              const ratingDate = moment(comment.ratingList[0].ratingDate).tz('Asia/Taipei').format('YYYY年M月D日');
                              const rate = comment.ratingList[0].orderRating;
                              const commentContent = comment.ratingList[0].ratingComment;
                              const replyComment = comment.ratingList[0].replyInfo[0]?.replyComment;
                              
                              return (
                                <div
                                  key={"userReview" + index}
                                  className="bg-white rounded-lg p-4 mb-4"
                                >
                                  <div className="flex flex-col gap-2">
                                    <h5 className="text-sans-b-body1 text-Landlord-50">{lastName + gender}</h5>
                                    <time className="text-sans-body1">{ratingDate}</time>
                                    <div className="flex gap-2">
                                      {
                                        [...Array(rate)].map((_, index) => {
                                          return <img src={star} alt="star" key={"star" + index} />
                                        })
                                      }
                                    </div>
                                    <p className="mt-2 text-sans-body1">{commentContent}</p>
                                  </div>
                                  {
                                    replyComment && (
                                      <div className="mt-4 pt-6 border-t border-Neutral-95">
                                        <h5 className="text-sans-b-body1 text-Landlord-50 mb-4">租客回覆</h5>
                                        <p className="mt-2 text-sans-body1">{replyComment}</p>
                                      </div>
                                    )
                                  }
                                </div>
                              )
                            })
                          }
                        </div>
                      ) : null
                    }
                  </>
                )
              }
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      </Flowbite>
    </>
  );
}