import { useState } from "react";
import { useForm } from "react-hook-form";
import close from "../../../assets/imgs/icons/close.svg";

type CreateContractPropsType = {
  handleCreateContractClose: () => void
}

export default function CreateContract({handleCreateContractClose}: CreateContractPropsType) {
  const [isLandlordNameFocused,setIsLandlordNameFocused] = useState(false);
  const [isTenantNameFocused,setIsTenantNameFocused] = useState(false);
  const [isHouseAddressFocused,setIsHouseAddressFocused] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      landlordName: "房東名稱", //房東名稱
      tenantName: "租客名稱", //租客名稱
      address : "房屋地址", //物件地址
      contractPaymentBeforeDate : 1, //幾日繳納房租
      contractTerminationNoticeMonth : "1", //合約終止需提前幾月告知
      contractTerminationPenaltyMonth : "1" //合約終止需罰款幾月
    }
  });
  const onSubmit = data => console.log(data);

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
                  {...register("landlordName", { required: true })}
                />
                <label
                  htmlFor="landlordName"
                  className="absolute bg-white text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] peer-focus:px-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                >
                  出租人
                </label>
              </div>
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
                  {...register("tenantName", { required: true })}
                />
                <label
                  htmlFor="tenantName"
                  className="absolute bg-white text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] peer-focus:px-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                >
                  承租人
                </label>
              </div>
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
                  {...register("address", { required: true })}
                />
                <label
                  htmlFor="houseAddress"
                  className="absolute bg-white text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] peer-focus:px-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                >
                  完整地址
                </label>
              </div>
              <p className="text-sans-caption pt-1 pl-3">請完整填寫，包含樓層、室</p>
            </div>
          </section>
          <section className="py-6 mb-10">
            <p className="flex items-center gap-3 mb-6">
              <span>承租者必須在每月</span>
              <input
                type="number"
                max={31}
                min={1}
                className="w-24 h-12 p-3 rounded border-black focus:ring-Brand-30 focus:border-Brand-30"
                {...register("contractPaymentBeforeDate", { required: true })}
              />
              <span>日前繳納房租</span>
            </p>
            <div className="flex items-center gap-2 mb-6">
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
            <div className="flex items-center gap-2 mb-6">
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