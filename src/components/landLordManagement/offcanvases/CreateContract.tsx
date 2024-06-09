import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import close from "../../../assets/imgs/icons/close.svg";
import { apiOrderLandlordContractInfo } from "../../../apis/apis";

type CreateContractPropsType = {
  handleCreateContractClose: () => void;
  orderId: number | undefined;
}

type FormDataType = {
  orderId: number | undefined;
  landlordName: string;
  tenantName: string;
  address: string;
  contractPaymentBeforeDate: string | null; //幾號前繳房租
  contractTerminationNoticeMonth: string | null; //終止合約提前幾個月通知
  contractTerminationPenaltyMonth: string | null; //違約金幾個月
}

export default function CreateContract({handleCreateContractClose, orderId}: CreateContractPropsType) {
  const [isLandlordNameFocused,setIsLandlordNameFocused] = useState(false);
  const [isTenantNameFocused,setIsTenantNameFocused] = useState(false);
  const [isHouseAddressFocused,setIsHouseAddressFocused] = useState(false);
  const [contractInfo,setContractInfo] = useState<FormDataType>();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormDataType>();
  const onSubmit = (data: FormDataType) => console.log(data);

  useEffect(() => {
    const getContractInfo = async (order: number) => {
      try {
        const response = await apiOrderLandlordContractInfo(order);
        setContractInfo(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    if(orderId){
      getContractInfo(orderId);
    }
  },[orderId]);

  useEffect(() => {
    if (contractInfo) {
      reset({
        orderId: contractInfo.orderId,
        landlordName: contractInfo.landlordName || "",
        tenantName: contractInfo.tenantName || "",
        address: contractInfo.address || "",
        contractPaymentBeforeDate: contractInfo.contractPaymentBeforeDate || "1",
        contractTerminationNoticeMonth: contractInfo.contractTerminationNoticeMonth || "1",
        contractTerminationPenaltyMonth: contractInfo.contractTerminationPenaltyMonth || "1"
      });
    }
  }, [contractInfo, reset]);

  return (
    <div className="layout-grid gap-4 mb-32">
      <div className="col-span-10 flex flex-col gap-6">
        <button
          type="button"
          className="self-end"
          onClick={handleCreateContractClose}
        >
          <img src={close} alt="close" />
        </button>
        <h4 className="text-sans-h5 mb-4">建立合約</h4>
        <p className="text-sans-body2 mb-[10px]">在生成合約前，請確實填寫以下資訊，以保障您與租客的權益</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="border-b border-Neutral-95">
            <div className="mb-[34px]">
              <div
                tabIndex={0}
                className={`relative flex w-full rounded ${
                  isLandlordNameFocused ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
                }`}
                onFocus={() => setIsLandlordNameFocused(true)}
                onBlur={() => setIsLandlordNameFocused(false)}
              >
                <input
                  type="tel"
                  id="landlordName"
                  className="block w-full p-3 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                  placeholder=""
                  {...register("landlordName", {
                    required: { value: true, message: "若需儲存，請輸入您的姓名，系統將替您自動帶入資料" },
                  })}
                />
                <label
                  htmlFor="landlordName"
                  className="absolute bg-white text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] peer-focus:px-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                >
                  出租人
                </label>
              </div>
              {errors.landlordName?.message && (
                <p className="post-alert">{errors.landlordName?.message}</p>
              )}
            </div>
            <div className="mb-[34px]">
              <div
                tabIndex={0}
                className={`relative flex w-full rounded ${
                  isTenantNameFocused ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
                }`}
                onFocus={() => setIsTenantNameFocused(true)}
                onBlur={() => setIsTenantNameFocused(false)}
              >
                <input
                  type="tel"
                  id="tenantName"
                  className="block w-full p-3 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                  placeholder=""
                  {...register("tenantName", {
                    required: { value: true, message: "若需儲存，請輸入租客姓名，系統將替您自動帶入資料" },
                  })}
                />
                <label
                  htmlFor="tenantName"
                  className="absolute bg-white text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] peer-focus:px-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                >
                  承租人
                </label>
              </div>
              {errors.tenantName?.message && (
                <p className="post-alert">{errors.tenantName?.message}</p>
              )}
            </div>
            <div className="mb-6">
              <div
                tabIndex={0}
                className={`relative flex w-full rounded ${
                  isHouseAddressFocused ? "border-Brand-30 border-2 -m-[1px]"
                  : "border-black border"
                }`}
                onFocus={() => setIsHouseAddressFocused(true)}
                onBlur={() => setIsHouseAddressFocused(false)}
              >
                <input
                  type="tel"
                  id="houseAddress"
                  className="block w-full p-3 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                  placeholder=""
                  {...register("address", {
                    required: { value: true, message: "若需儲存，請輸入完整地址，系統將替您自動帶入資料" },
                  })}
                />
                <label
                  htmlFor="houseAddress"
                  className="absolute bg-white text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] peer-focus:px-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                >
                  完整地址
                </label>
              </div>
              {errors.address?.message ? (
                <p className="post-alert">{errors.address?.message}</p>
                ):(
                <p className="text-sans-caption pt-1 pl-3">請完整填寫，包含樓層、室</p>  
              )}
            </div>
          </section>
          <section className="py-6 mb-10">
            <p className="flex items-center gap-3">
              <span>承租者必須在每月</span>
              <input
                type="number"
                className="w-24 h-12 p-3 rounded border-black focus:ring-Brand-30 focus:border-Brand-30"
                {...register("contractPaymentBeforeDate", {
                  required: { value: true, message: "請輸入繳納房租日期" },
                  min: { value: 1, message: "請輸入正確日期" },
                  max: { value: 31, message: "請輸入正確日期" },
                })}
              />
              <span>日前繳納房租</span>
            </p>
            {errors.contractPaymentBeforeDate?.message && (
              <p className="post-alert translate-x-1/4">{errors.contractPaymentBeforeDate?.message}</p>
            )}
            <div className="flex items-center gap-2 mt-6">
              <span>若需提前終止本約，需於</span>
              <fieldset className="flex gap-2">
                <div className="flex gap-2 items-center">
                  <input 
                    type="radio" 
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    id="oneMonthEarly" 
                    value="1"
                    {...register("contractTerminationNoticeMonth", { required: true })}
                  />
                  <label htmlFor="oneMonthEarly" className="pr-3.5">一個月</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input 
                    type="radio" 
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    id="twoMonthEarly" 
                    value="2"
                    {...register("contractTerminationNoticeMonth", { required: true })}
                  />
                  <label htmlFor="twoMonthEarly" className="pr-3.5">兩個月</label>
                </div>
              </fieldset>
              <span>前通知他方</span>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <span>若需提前終止本約，需於繳納</span>
              <fieldset className="flex gap-2">
                <div className="flex gap-2 items-center">
                  <input 
                    type="radio" 
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    id="oneMonthPenalty" 
                    value="1"
                    {...register("contractTerminationPenaltyMonth", { required: true })}
                  />
                  <label htmlFor="oneMonthPenalty" className="pr-3.5">一個月</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input 
                    type="radio" 
                    className="w-6 h-6 text-black bg-transparent border-black focus:ring-0 focus:ring-transparent"
                    id="twoMonthPenalty" 
                    value="2" 
                    {...register("contractTerminationPenaltyMonth", { required: true })}
                  />
                  <label htmlFor="twoMonthPenalty" className="pr-3.5">兩個月</label>
                </div>
              </fieldset>
              <span>違約金</span>
            </div>
          </section>
          <div className="flex justify-end gap-6">
            <button
              type="button"
              className="outline-button-m ml-auto"
            >不儲存，直接下載</button>
            <button
              type="submit"
              className="filled-button-m"
            >儲存，建立合約</button>
          </div>
        </form>
      </div>
    </div>
  );
}