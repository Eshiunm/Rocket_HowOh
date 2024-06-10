import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

function HouseViewingManagementPage() {
  const navigate = useNavigate();
  const [isLinkActive, setIsLinkActive] = useState("houseViewingList");
  const handleRouteSetting = (e: any) => {
    const linkId = e.currentTarget.dataset.linkid;
    if (linkId === "houseViewingList") {
      setIsLinkActive("houseViewingList");
      navigate("/tenant/houseViewingManagement/houseViewingList");
    } else if (linkId === "rentalInviteList") {
      setIsLinkActive("rentalInviteList");
      navigate("/tenant/houseViewingManagement/rentalInviteList");
    } else if (linkId === "rentalHistoryList") {
      setIsLinkActive("rentalHistoryList");
      navigate("/tenant/houseViewingManagement/rentalHistoryList");
    } else if (linkId === "feedbackPendingList") {
      setIsLinkActive("feedbackPendingList");
      navigate("/tenant/feedbackManagement/feedbackPendingList");
    }
  };
  return (
    <>
      <div className="h-screen">
        <section className="py-6 mb-6 border-b border-t border-Neutral-95 bg-Neutral-99">
          <div className="container">
            <h2 className="text-sans-b-h5">評價管理</h2>
          </div>
        </section>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
export default HouseViewingManagementPage;
