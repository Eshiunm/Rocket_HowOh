import { Avatar, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
function NavigationLogin() {
  // const identity = "tenant"; // landlord
  return (
    <>
      <ul className="flex gap-6 items-center">
        {/* <li>
          <Link to="/" className="text-sans-b-body1 p-2">
            {identity === "tenant" ? "我是房客" : "我是房東"}
          </Link>
        </li> */}
        <li>
          <div className="flex gap-1 bg-Tenant-90 py-1 ps-1 pr-3 rounded-full">
            {/* 如果要放圖片，可以再參考一下 flowbite react ui component */}
            <Avatar rounded size="sm" />
            <Dropdown
              label=""
              dismissOnClick={false}
              inline
              size="xs"
              className="w-[240px] rounded-lg"
            >
              <Dropdown.Item>
                <Link to={"/"} className="w-full text-sans-b-body1">
                  看房管理
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={"/login"} className="w-full text-sans-b-body1">
                  評價管理
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={"/login"} className="w-full text-sans-b-body1">
                  設定
                </Link>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </li>
      </ul>
    </>
  );
}
export default NavigationLogin;
