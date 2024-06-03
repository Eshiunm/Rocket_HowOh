import { useEffect, useState } from "react";
import { CustomFlowbiteTheme, Flowbite, Tooltip, Drawer } from "flowbite-react";
import picture from "../../../assets/imgs/tenantManagement/Rectangle 17.jpg";
import close from "../../../assets/imgs/icons/close.svg";
import "flowbite";

function HouseViewingList() {
  // offCanvas 樣式
  const customTheme: CustomFlowbiteTheme = {
    drawer: {
      root: {
        base: "fixed z-40 overflow-y-auto px-10 pt-10 transition-transform",
        backdrop: "fixed inset-0 z-30 bg-transparent",
        edge: "bottom-16",
        position: {
          right: {
            on: "shadow-elevation-3 right-0 top-[64px] bottom-0 w-5/12 transform-none scrollbar-hide",
            off: "right-0 top-[152px] h-screen w-5/12 translate-x-full",
          },
        },
      },
      header: {
        inner: {
          closeButton:
            "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
          closeIcon: "h-4 w-4",
          titleIcon: "me-2.5 h-4 w-4",
          titleText:
            "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400",
        },
        collapsed: {
          on: "hidden",
          off: "block",
        },
      },
      items: {
        base: "",
      },
    },
  };
  const [isDrawdOpen, setIsDrawdOpen] = useState(false);
  const [rentalListTypeState, setRentalListTypeState] = useState("rented"); // 預設渲染已出租清單
  //const [rentalList, setRentalList] = useState([]);
  const handleRentalListType = (e: any) => {
    const rentalType = e.currentTarget.dataset.rentaltype;
    if (rentalType === "rented") {
      setRentalListTypeState("rented");
    } else if (rentalType === "unrented") {
      setRentalListTypeState("unrented");
    }
  };
  return (
    <>
      {/* offCanvas */}
      <Flowbite theme={{ theme: customTheme }}>
        <Drawer
          className="bg-Neutral-99"
          open={isDrawdOpen}
          onClose={() => setIsDrawdOpen(false)}
          position="right"
        >
          <Drawer.Items>
            <div className="layout-grid mb-32">
              <div className="col-span-10 flex flex-col gap-6">
                <button
                  type="button"
                  className="self-end"
                  onClick={() => setIsDrawdOpen(false)}
                >
                  <img src={close} alt="close" />
                </button>
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      </Flowbite>
      <section className="bg-Neutral-99 pt-8 pb-28 h-screen">
        <div className="container layout-grid">
          <div className="col-span-7">
            <div className="p-5 bg-white rounded-xl ">
              <div className="flex justify-between mb-6 pb-3 border-b border-Neutral-95">
                <div className="flex gap-x-3 items-center ml-3">
                  <button
                    type="button"
                    className={`border text-sans-b-body1 py-1 px-4 rounded-[24px] ${
                      rentalListTypeState === "rented"
                        ? " bg-Tenant-50 text-white "
                        : "bg-white text-black"
                    }`}
                    data-rentaltype="rented"
                    onClick={handleRentalListType}
                  >
                    未出租
                  </button>
                  <button
                    type="button"
                    className={`py-1 border border-Tenant-50 text-sans-b-body1 px-4 rounded-[24px] ${
                      rentalListTypeState === "unrented"
                        ? " bg-Tenant-50 text-white"
                        : "bg-white text-black"
                    }`}
                    data-rentaltype="unrented"
                    onClick={handleRentalListType}
                  >
                    已出租
                  </button>
                </div>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    顯示 1 至 12 筆 共 59 筆
                  </p>
                  <div className="flex gap-x-1">
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-l-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-Neutral-90"
                    >
                      <svg
                        className="fill-white"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.3539 2.14689C11.4005 2.19334 11.4374 2.24852 11.4626 2.30926C11.4878 2.37001 11.5008 2.43513 11.5008 2.50089C11.5008 2.56666 11.4878 2.63178 11.4626 2.69253C11.4374 2.75327 11.4005 2.80845 11.3539 2.85489L5.70692 8.50089L11.3539 14.1469C11.4478 14.2408 11.5006 14.3681 11.5006 14.5009C11.5006 14.6337 11.4478 14.761 11.3539 14.8549C11.26 14.9488 11.1327 15.0015 10.9999 15.0015C10.8671 15.0015 10.7398 14.9488 10.6459 14.8549L4.64592 8.85489C4.59935 8.80845 4.56241 8.75327 4.5372 8.69253C4.512 8.63178 4.49902 8.56666 4.49902 8.50089C4.49902 8.43513 4.512 8.37001 4.5372 8.30926C4.56241 8.24852 4.59935 8.19334 4.64592 8.14689L10.6459 2.14689C10.6924 2.10033 10.7475 2.06339 10.8083 2.03818C10.869 2.01297 10.9342 2 10.9999 2C11.0657 2 11.1308 2.01297 11.1916 2.03818C11.2523 2.06339 11.3075 2.10033 11.3539 2.14689Z"
                        />
                      </svg>
                      上一頁
                    </button>
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-r-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-black"
                    >
                      下一頁
                      <svg
                        className="fill-white"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <ul>
                <li className="p-3">
                  <div className="flex justify-between">
                    <div className="flex gap-x-4">
                      <img src={picture} alt="picture" />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-sans-b-h6">
                          信義國小套房 捷運3分鐘
                        </h3>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            房東
                          </span>
                          <span>陳先生</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            租金
                          </span>
                          <span>15,000</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            電話
                          </span>
                          <span>0936-123-123</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p
                        className="flex gap-x-2 cursor-pointer"
                        data-tooltip-target="tooltip-default-1"
                      >
                        <span className="pr-2 border-r border-Tenant-70">
                          2024年5月18日
                        </span>
                        <span>14:40</span>
                      </p>
                      {/* tooltip */}
                      <div
                        id="tooltip-default-1"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block  w-[200px] px-3 py-2 text-center text-sans-body2 text-white transition-opacity duration-300 bg-Tenant-30 rounded-lg shadow-sm opacity-0 tooltip"
                      >
                        申請預約的時間
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      {/* 查看更多 */}
                      <div className="flex justify-between hover:opacity-75">
                        <span></span>
                        <button
                          type="button"
                          className="flex items-center gap-x-[10px] py-1 text-sans-body1 border-b border-black"
                          onClick={() => setIsDrawdOpen(true)}
                        >
                          <span className="text-sans-b-body1">查看更多</span>
                          <svg
                            className="fill-black"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="p-3">
                  <div className="flex justify-between">
                    <div className="flex gap-x-4">
                      <img src={picture} alt="picture" />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-sans-b-h6">
                          信義國小套房 捷運3分鐘
                        </h3>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            房東
                          </span>
                          <span>陳先生</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            租金
                          </span>
                          <span>15,000</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            電話
                          </span>
                          <span>0936-123-123</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p
                        className="flex gap-x-2 cursor-pointer"
                        data-tooltip-target="tooltip-default-1"
                      >
                        <span className="pr-2 border-r border-Tenant-70">
                          2024年5月18日
                        </span>
                        <span>14:40</span>
                      </p>
                      {/* tooltip */}
                      <div
                        id="tooltip-default-1"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block  w-[200px] px-3 py-2 text-center text-sans-body2 text-white transition-opacity duration-300 bg-Tenant-30 rounded-lg shadow-sm opacity-0 tooltip"
                      >
                        申請預約的時間
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      {/* 查看更多 */}
                      <div className="flex justify-between hover:opacity-75">
                        <span></span>
                        <button
                          type="button"
                          className="flex items-center gap-x-[10px] py-1 text-sans-body1 border-b border-black"
                          onClick={() => setIsDrawdOpen(true)}
                        >
                          <span className="text-sans-b-body1">查看更多</span>
                          <svg
                            className="fill-black"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="p-3">
                  <div className="flex justify-between">
                    <div className="flex gap-x-4">
                      <img src={picture} alt="picture" />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-sans-b-h6">
                          信義國小套房 捷運3分鐘
                        </h3>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            房東
                          </span>
                          <span>陳先生</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            租金
                          </span>
                          <span>15,000</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            電話
                          </span>
                          <span>0936-123-123</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p
                        className="flex gap-x-2 cursor-pointer"
                        data-tooltip-target="tooltip-default-1"
                      >
                        <span className="pr-2 border-r border-Tenant-70">
                          2024年5月18日
                        </span>
                        <span>14:40</span>
                      </p>
                      {/* tooltip */}
                      <div
                        id="tooltip-default-1"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block  w-[200px] px-3 py-2 text-center text-sans-body2 text-white transition-opacity duration-300 bg-Tenant-30 rounded-lg shadow-sm opacity-0 tooltip"
                      >
                        申請預約的時間
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      {/* 查看更多 */}
                      <div className="flex justify-between hover:opacity-75">
                        <span></span>
                        <button
                          type="button"
                          className="flex items-center gap-x-[10px] py-1 text-sans-body1 border-b border-black"
                          onClick={() => setIsDrawdOpen(true)}
                        >
                          <span className="text-sans-b-body1">查看更多</span>
                          <svg
                            className="fill-black"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="p-3">
                  <div className="flex justify-between">
                    <div className="flex gap-x-4">
                      <img src={picture} alt="picture" />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-sans-b-h6">
                          信義國小套房 捷運3分鐘
                        </h3>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            房東
                          </span>
                          <span>陳先生</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            租金
                          </span>
                          <span>15,000</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            電話
                          </span>
                          <span>0936-123-123</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p
                        className="flex gap-x-2 cursor-pointer"
                        data-tooltip-target="tooltip-default-1"
                      >
                        <span className="pr-2 border-r border-Tenant-70">
                          2024年5月18日
                        </span>
                        <span>14:40</span>
                      </p>
                      {/* tooltip */}
                      <div
                        id="tooltip-default-1"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block  w-[200px] px-3 py-2 text-center text-sans-body2 text-white transition-opacity duration-300 bg-Tenant-30 rounded-lg shadow-sm opacity-0 tooltip"
                      >
                        申請預約的時間
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      {/* 查看更多 */}
                      <div className="flex justify-between hover:opacity-75">
                        <span></span>
                        <button
                          type="button"
                          className="flex items-center gap-x-[10px] py-1 text-sans-body1 border-b border-black"
                          onClick={() => setIsDrawdOpen(true)}
                        >
                          <span className="text-sans-b-body1">查看更多</span>
                          <svg
                            className="fill-black"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="p-3">
                  <div className="flex justify-between">
                    <div className="flex gap-x-4">
                      <img src={picture} alt="picture" />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-sans-b-h6">
                          信義國小套房 捷運3分鐘
                        </h3>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            房東
                          </span>
                          <span>陳先生</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            租金
                          </span>
                          <span>15,000</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            電話
                          </span>
                          <span>0936-123-123</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p
                        className="flex gap-x-2 cursor-pointer"
                        data-tooltip-target="tooltip-default-1"
                      >
                        <span className="pr-2 border-r border-Tenant-70">
                          2024年5月18日
                        </span>
                        <span>14:40</span>
                      </p>
                      {/* tooltip */}
                      <div
                        id="tooltip-default-1"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block  w-[200px] px-3 py-2 text-center text-sans-body2 text-white transition-opacity duration-300 bg-Tenant-30 rounded-lg shadow-sm opacity-0 tooltip"
                      >
                        申請預約的時間
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      {/* 查看更多 */}
                      <div className="flex justify-between hover:opacity-75">
                        <span></span>
                        <button
                          type="button"
                          className="flex items-center gap-x-[10px] py-1 text-sans-body1 border-b border-black"
                          onClick={() => setIsDrawdOpen(true)}
                        >
                          <span className="text-sans-b-body1">查看更多</span>
                          <svg
                            className="fill-black"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="p-3">
                  <div className="flex justify-between">
                    <div className="flex gap-x-4">
                      <img src={picture} alt="picture" />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-sans-b-h6">
                          信義國小套房 捷運3分鐘
                        </h3>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            房東
                          </span>
                          <span>陳先生</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            租金
                          </span>
                          <span>15,000</span>
                        </p>
                        <p className="flex gap-x-2">
                          <span className="pr-2 border-r border-Tenant-70">
                            電話
                          </span>
                          <span>0936-123-123</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p
                        className="flex gap-x-2 cursor-pointer"
                        data-tooltip-target="tooltip-default-1"
                      >
                        <span className="pr-2 border-r border-Tenant-70">
                          2024年5月18日
                        </span>
                        <span>14:40</span>
                      </p>
                      {/* tooltip */}
                      <div
                        id="tooltip-default-1"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block  w-[200px] px-3 py-2 text-center text-sans-body2 text-white transition-opacity duration-300 bg-Tenant-30 rounded-lg shadow-sm opacity-0 tooltip"
                      >
                        申請預約的時間
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      {/* 查看更多 */}
                      <div className="flex justify-between hover:opacity-75">
                        <span></span>
                        <button
                          type="button"
                          className="flex items-center gap-x-[10px] py-1 text-sans-body1 border-b border-black"
                          onClick={() => setIsDrawdOpen(true)}
                        >
                          <span className="text-sans-b-body1">查看更多</span>
                          <svg
                            className="fill-black"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="flex justify-between mt-2 pt-3 border-t border-Neutral-95">
                <div></div>
                <div>
                  <p className="text-sans-b-body2 text-center text-Brand-10 mb-2">
                    顯示 1 至 12 筆 共 59 筆
                  </p>
                  <div className="flex gap-x-1">
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-l-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-Neutral-90"
                    >
                      <svg
                        className="fill-white"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.3539 2.14689C11.4005 2.19334 11.4374 2.24852 11.4626 2.30926C11.4878 2.37001 11.5008 2.43513 11.5008 2.50089C11.5008 2.56666 11.4878 2.63178 11.4626 2.69253C11.4374 2.75327 11.4005 2.80845 11.3539 2.85489L5.70692 8.50089L11.3539 14.1469C11.4478 14.2408 11.5006 14.3681 11.5006 14.5009C11.5006 14.6337 11.4478 14.761 11.3539 14.8549C11.26 14.9488 11.1327 15.0015 10.9999 15.0015C10.8671 15.0015 10.7398 14.9488 10.6459 14.8549L4.64592 8.85489C4.59935 8.80845 4.56241 8.75327 4.5372 8.69253C4.512 8.63178 4.49902 8.56666 4.49902 8.50089C4.49902 8.43513 4.512 8.37001 4.5372 8.30926C4.56241 8.24852 4.59935 8.19334 4.64592 8.14689L10.6459 2.14689C10.6924 2.10033 10.7475 2.06339 10.8083 2.03818C10.869 2.01297 10.9342 2 10.9999 2C11.0657 2 11.1308 2.01297 11.1916 2.03818C11.2523 2.06339 11.3075 2.10033 11.3539 2.14689Z"
                        />
                      </svg>
                      上一頁
                    </button>
                    <button
                      type="button"
                      className="flex gap-x-[10px] rounded-r-lg items-center text-sans-b-body1 text-white p-2 hover:opacity-80 bg-black"
                    >
                      下一頁
                      <svg
                        className="fill-white"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.64592 2.14689C4.69236 2.10033 4.74754 2.06339 4.80828 2.03818C4.86903 2.01297 4.93415 2 4.99992 2C5.06568 2 5.13081 2.01297 5.19155 2.03818C5.2523 2.06339 5.30747 2.10033 5.35392 2.14689L11.3539 8.14689C11.4005 8.19334 11.4374 8.24852 11.4626 8.30926C11.4878 8.37001 11.5008 8.43513 11.5008 8.50089C11.5008 8.56666 11.4878 8.63178 11.4626 8.69253C11.4374 8.75327 11.4005 8.80845 11.3539 8.85489L5.35392 14.8549C5.26003 14.9488 5.13269 15.0015 4.99992 15.0015C4.86714 15.0015 4.7398 14.9488 4.64592 14.8549C4.55203 14.761 4.49929 14.6337 4.49929 14.5009C4.49929 14.3681 4.55203 14.2408 4.64592 14.1469L10.2929 8.50089L4.64592 2.85489C4.59935 2.80845 4.56241 2.75327 4.5372 2.69253C4.512 2.63178 4.49902 2.56666 4.49902 2.50089C4.49902 2.43513 4.512 2.37001 4.5372 2.30926C4.56241 2.24852 4.59935 2.19334 4.64592 2.14689Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HouseViewingList;
