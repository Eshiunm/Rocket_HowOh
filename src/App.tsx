import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import SwitchIdentityPage from "./pages/signUp/SwitchIdentityPage";
import CreateAccountPage from "./pages/signUp/CreateAccountPage";
import LoginPage from "./pages/login/loginPage";
import AddNew from "./pages/landlordManagement/AddNew";
import LandlordManagement from "./pages/landlordManagement/LandlordManagement";
import HouseList from "./components/landLordManagement/index/HouseList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="signUp" element={<SwitchIdentityPage />}></Route>
          <Route path="signUp/createAccount" element={<CreateAccountPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="post" element={<AddNew />}></Route>
          <Route path="landlord-management" element={<LandlordManagement />} >
            <Route index element={<HouseList />} />
            <Route path="history" element={<h1>出租歷史</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
