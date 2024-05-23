import { Avatar, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import asd from "../../assets/imgs/homePage/aboutMe_bgImg_1.jpg";

function NavigationLogin() {
  let identity = "";
  const [userProfileUrl, setUserProfileUrl] = useState("");

  useEffect(() => {
    identity = localStorage.getItem("currentIdentity")?.toString() || "";
    const userProfile = localStorage.getItem("userProfile")?.toString() || "";
    setUserProfileUrl(userProfile);
    // console.log(typeof userProfile);
  });
  return (
    <>
      <ul className="flex gap-6 items-center">
        <li>
          <div
            className={
              identity === "tenant"
                ? "flex gap-1 bg-Tenant-90 py-1 ps-1 pr-3 rounded-full"
                : "flex gap-1 bg-Landlord-90 py-1 ps-1 pr-3 rounded-full"
            }
          >
            {/* 如果要放圖片，可以再參考一下 flowbite react ui component */}
            {identity === "tenant" ? (
              <>
                <Avatar rounded size="sm" img={asd} />
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
                  <Dropdown.Item>
                    <Link to={"/login"} className="w-full text-sans-b-body1">
                      登出
                    </Link>
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <>
                <Avatar rounded size="sm" img={`${userProfileUrl}`} />
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
                  <Dropdown.Item>
                    <Link to={"/login"} className="w-full text-sans-b-body1">
                      登出
                    </Link>
                  </Dropdown.Item>
                </Dropdown>
              </>
            )}
          </div>
        </li>
      </ul>
    </>
  );
}
export default NavigationLogin;
