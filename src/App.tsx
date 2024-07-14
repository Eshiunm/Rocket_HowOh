import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import MapSearchPage from "./pages/MapSerachPage";
import HouseListPage from "./pages/HouseListPage";
import SingleHousePage from "./pages/SingleHousePage";
import SwitchIdentityPage from "./pages/signUp/SwitchIdentityPage";
import CreateAccountPage from "./pages/signUp/CreateAccountPage";
import LoginPage from "./pages/login/loginPage";
import AddNew from "./pages/landlordManagement/AddNew";
import LandlordManagement from "./pages/landlordManagement/LandlordManagement";
import HouseList from "./components/landLordManagement/index/HouseList";
import PublishHouse from "./pages/landlordManagement/PublishHouse";
import TenantRequest from "./pages/landlordManagement/TenantRequest";
import HouseViewingManagementPage from "./pages/tenantManagement/HouseViewingManagementPage";
import FeedbackManagementPage from "./pages/tenantManagement/FeedbackManagementPage";
import HouseViewingList from "./components/tenantManagement/houseViewingManagement/HouseViewingList";
import RentalInviteList from "./components/tenantManagement/houseViewingManagement/RentalInviteList";
import RentalHistoryList from "./components/tenantManagement/houseViewingManagement/RentalHistoryList";
import FeedbackPendingList from "./components/tenantManagement/feedbackManagement/FeedbackPendingList";
import RentedHouse from "./pages/landlordManagement/RentedHouse";
import FinishHouse from "./pages/landlordManagement/FinishHouse";
import RentedHistory from "./pages/landlordManagement/RentedHistory";
import ContractPreview from "./pages/landlordManagement/ContractPreview";
import Article_1 from "./pages/article/Article_1";
import Review from "./pages/landlordManagement/review";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="mapSearch" element={<MapSearchPage />}></Route>
          <Route path="houseList">
            <Route index element={<HouseListPage />}></Route>
            <Route path=":houseId" element={<SingleHousePage />}></Route>
          </Route>
          <Route path="signup" element={<SwitchIdentityPage />}></Route>
          <Route
            path="signup/createAccount"
            element={<CreateAccountPage />}
          ></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="landlord">
            <Route path="contract-preview" element={<ContractPreview />} />
            <Route element={<LandlordManagement />}>
              <Route index element={<HouseList />} />
              <Route path="history" element={<RentedHistory />} />
            </Route>
            <Route path="post" element={<AddNew />} />
            <Route path="publish">
              <Route path=":houseId">
                <Route index element={<PublishHouse />} />
                <Route path="request" element={<TenantRequest />} />
              </Route>
            </Route>
            <Route path="rented">
              <Route path=":houseId" element={<RentedHouse />} />
            </Route>
            <Route path="finished">
              <Route path=":houseId" element={<FinishHouse />} />
            </Route>
            <Route path="review" element={<Review />} />
          </Route>
          <Route path="tenant">
            <Route
              path="houseViewingManagement" // 看房管理頁面
              element={<HouseViewingManagementPage />}
            >
              <Route
                index
                path="houseViewingList"
                element={<HouseViewingList />}
              ></Route>
              <Route
                path="rentalInviteList"
                element={<RentalInviteList />}
              ></Route>
              <Route
                path="rentalHistoryList"
                element={<RentalHistoryList />}
              ></Route>
            </Route>
            <Route
              path="feedbackManagement" // 評價管理頁面
              element={<FeedbackManagementPage />}
            >
              <Route
                path="feedbackPendingList"
                element={<FeedbackPendingList />}
              ></Route>
            </Route>
          </Route>
          <Route path="article">
            <Route index element={<Article_1 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
