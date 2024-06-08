function SingleHousePageSkeleton() {
  return (
    <>
      <div className="wrap bg-Neutral-99 pb-32">
        {/* 房源圖片 */}
        <div className="container layout-grid pt-6 mb-6">
          {/* 首圖 */}
          <div className="col-span-6 col-start-2 overflow-hidden"></div>
          {/* 次要圖片 */}
          <div className="col-span-4"></div>
        </div>

        {/* 房源細項內容 */}
        <div className="container layout-grid">
          {/* 房源描述 */}
          <div className="col-span-6 col-start-2"></div>

          {/* 房東基本資訊 */}
          <div className="col-span-3 col-start-9 ">
            {/* 查看更多照片 */}
            <div className="flex justify-between"></div>

            <div className="sticky top-[80px]">
              {/* 預約看房 */}
              <div className=" shadow-elevation-3 rounded-2xl p-6 mb-[14px]">
                <ul className="flex flex-col gap-y-[34px]"></ul>
              </div>
              {/* 房東基本資訊 */}
              <div className="shadow-elevation-3 rounded-2xl p-6">
                <ul className="flex flex-col gap-y-6"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleHousePageSkeleton;
