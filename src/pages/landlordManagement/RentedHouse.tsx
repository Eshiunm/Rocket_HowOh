import { useNavigate } from "react-router-dom";

export default function RentedHouse() {
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-Landlord-99">
        <div className="container py-6">
          <span className="badge-m  bg-Landlord-90">已承租</span>
          <h2 className="text-sans-b-h5 mt-3 mb-6">房源名稱</h2>
          <div className="flex gap-6 pt-7">
            <button
              type="button"
              className="outline-button-m"
            >查看房源資訊</button>
            {/* <Drawer className="bg-Neutral-99" open={isRentedOpen} onClose={() => handleRentedCanvas(false)} position="right">
              <Drawer.Items>
                <div className="layout-grid mb-32">
                  <div className="col-span-10 flex flex-col gap-6">
                    <button
                      type="button"
                      className="self-end"
                      onClick={() => handleRentedCanvas(false)}
                    >
                      <img src={close} alt="close" />
                    </button>
                    <h3 className="text-sans-h5 mb-4">
                      更改：已承租
                    </h3>
                    <p className="mb-2 text-sans-body1">請填入承租資訊及合約起迄時間。</p>
                    <form>
                      <div className="mb-5">
                        <div
                          tabIndex={0}
                          className={`relative flex w-full p-3 rounded ${
                            isPhoneFocused ? "border-Brand-30 border-2 -m-[1px]"
                            : "border-black border"
                          }`}
                          onFocus={() => setIsPhoneFocused(true)}
                          onBlur={() => setIsPhoneFocused(false)}
                        >
                          <input
                            type="tel"
                            id="tenantPhone"
                            className="block w-full p-0 pl-1 text-sans-body1 text-black bg-transparent border-none appearance-none focus:ring-0 peer"
                            placeholder=""
                            maxLength={10}
                          />
                          <label
                            htmlFor="tenantPhone"
                            className="absolute bg-Neutral-99 text-sans-body1 text-Neutral-50 duration-200 transform -translate-y-4 scale-75 top-[3px] z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[3px] peer-focus:scale-75 peer-focus:-translate-y-4 start-3"
                          >
                            承租人手機
                          </label>
                        </div>
                      </div>
                      <div className="mb-6 flex gap-6 items-center">
                        <div className="flex-1 relative">
                          <label htmlFor="startTime" className="text-sans-caption px-0.5 bg-Neutral-99 absolute -top-2 left-3">合約起始日</label>
                          <input type="date" name="startTime" id="startTime" className="w-full p-3 rounded border-black focus:ring-0 focus:border-Brand-30 bg-Neutral-99"/>
                        </div>
                        至
                        <div className="flex-1 relative">
                          <label htmlFor="endTime" className="text-sans-caption px-0.5 bg-Neutral-99 absolute -top-2 left-3">合約結束日</label>
                          <input type="date" name="endTime" id="endTime" className="w-full p-3 rounded border-black focus:ring-0 focus:border-Brand-30 bg-Neutral-99"/>
                        </div>
                      </div>
                      <div className="mb-6 text-sans-body2 flex flex-col gap-2 items-start">
                        <p className="flex gap-2 bg-Alert-90 px-2 py-1 rounded-lg">
                          <img src={alertTriangle} alt="alert_triangle" />
                          請確保此用戶為您的承租客，我們將寄送租約邀請給此用戶
                        </p>
                        <p className="flex gap-2 bg-Brand-95 px-2 py-1 rounded-lg">
                          <img src={messageCloud} alt="message_cloud" />
                          當您填寫承租資訊時，您可以在合約結束後與該租客互相評價
                        </p>
                        <p className="flex gap-2 bg-Landlord-95 px-2 py-1 rounded-lg">
                          <img src={smileWink} alt="smile_wink" />
                          感謝您為友善的租屋環境付出心力，我們將在下次刊登時加強曝光
                        </p>
                      </div>
                      <div className="mb-10 flex gap-2 text-sans-body1">
                        <p>沒有承租資訊嗎？</p>
                        <button
                          type="button"
                          className="underline underline-offset-2"
                          onClick={() => setOpenForceChangeModal(true)}
                        >強制更改為已完成</button>
                      </div>
                      <div className="flex justify-end gap-6">
                        <button
                          type="button"
                          className="outline-button-m"
                          onClick={() => handleRentedCanvas(false)}>
                          取消
                        </button>
                        <button
                          type="button"
                          className="filled-button-m" 
                          onClick={() => handleRentedCanvas(false)}>
                          寄送租約邀請
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Drawer.Items>
            </Drawer> */}
            <button
              type="button"
              className="outline-button-m ml-auto"
              onClick={() => navigate("/landlord")}
            >返回房源管理頁面</button>
            <button type="button" className="filled-button-m h-full">建立合約</button>
          </div>
        </div>
      </header>
      <main className="container layout-grid pt-6 pb-52">
        <section className="col-span-7 rounded-lg bg-Landlord-99 p-5 mb-6">
          <h3 className="text-sans-h5 mb-6">承租資訊</h3>
          <h4 className="text-sans-b-h6 mb-6">租約起迄時間</h4>
          <div className="flex gap-6">
            <div className="w-full border-b border-Neutral-70">
              <h6 className="text-sans-caption mb-1">合約開始</h6>
              <time dateTime="2022-01-01" className="block p-3">2024年4月23日</time>
            </div>
            <div className="w-full border-b border-Neutral-70">
              <h6 className="text-sans-caption mb-1">合約結束</h6>
              <time dateTime="2022-01-01" className="block p-3">2025年4月23日</time>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}