import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import HouseListPage from "./pages/HouseListPage";
import SwitchIdentityPage from "./pages/signUp/SwitchIdentityPage";
import CreateAccountPage from "./pages/signUp/CreateAccountPage";
import LoginPage from "./pages/login/loginPage";
import AddNew from "./pages/landlordManagement/AddNew";
import LandlordManagement from "./pages/landlordManagement/LandlordManagement";
import HouseList from "./components/landLordManagement/index/HouseList";
import PublishHouse from "./pages/landlordManagement/PublishHouse";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="houseList">
            <Route index element={<HouseListPage />}></Route>
            <Route path=":houseId" element={<h1>你現在在單一房源頁面</h1>}></Route>
          </Route>
          <Route path="signup" element={<SwitchIdentityPage />}></Route>
          <Route
            path="signup/createAccount"
            element={<CreateAccountPage />}
          ></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="landlord" >
            <Route element={<LandlordManagement />}>
              <Route index element={<HouseList />} />
              <Route path="history" element={<h1>出租歷史</h1>} />
            </Route>
            <Route path="post" element={<AddNew />} />
            <Route path="publish" element={<PublishHouse />} />
            <Route path="comment" element={<h1>評價管理</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
