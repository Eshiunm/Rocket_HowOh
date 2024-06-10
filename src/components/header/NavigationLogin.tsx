import { Avatar, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavigationLogin() {
  const navigate = useNavigate();
  const [currentIdentity, setCurrentIdentity] = useState("");
  const [userProfileUrl, setUserProfileUrl] = useState("");

  const handleLogout = () => {
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("currentIdentity");
    // localStorage.removeItem("userProfile");
    localStorage.clear();
    navigate("/");
  };

  // 一直抓取當前登入身分，判斷 token 還在不在
  useEffect(() => {
    const currentIdentity =
      localStorage.getItem("currentIdentity")?.toString() || "";
    const userProfile = localStorage.getItem("userProfile")?.toString() || "";
    setCurrentIdentity(currentIdentity);
    setUserProfileUrl(userProfile);
    // console.log(typeof userProfile);
  });

  return (
    <>
      <ul className="flex gap-6 items-center">
        <li>
          <div
            className={
              currentIdentity === "tenant"
                ? "flex gap-1 bg-Tenant-90 py-1 ps-1 pr-3 rounded-full"
                : "flex gap-1 bg-Landlord-90 py-1 ps-1 pr-3 rounded-full"
            }
          >
            {/* 如果要放圖片，可以再參考一下 flowbite react ui component */}
            {currentIdentity === "tenant" ? (
              <>
                <Avatar
                  rounded
                  size="sm"
                  img={userProfileUrl !== "null" ? userProfileUrl : ""}
                />
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  inline
                  size="xs"
                  className="w-[240px] rounded-lg"
                >
                  <Dropdown.Item>
                    <Link
                      to={"/tenant/houseViewingManagement/houseViewingList"}
                      className="w-full text-sans-b-body1"
                    >
                      租屋管理
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      to={"/tenant/feedbackManagement/feedbackPendingList"}
                      className="w-full text-sans-b-body1"
                    >
                      評價管理
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/login"} className="w-full text-sans-b-body1">
                      設定
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span
                      className="w-full text-sans-b-body1"
                      onClick={handleLogout}
                    >
                      登出
                    </span>
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <>
                <Avatar
                  rounded
                  size="sm"
                  img={userProfileUrl !== "null" ? userProfileUrl : ""}
                />
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  inline
                  size="xs"
                  className="w-[240px] rounded-lg"
                >
                  <Dropdown.Item>
                    <span
                      className="w-full text-sans-b-body1"
                      onClick={handleLogout}
                    >
                      登出
                    </span>
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
