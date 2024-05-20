import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import SwitchIdentityPage from "./pages/signUp/SwitchIdentityPage";
import CreateAccountPage from "./pages/signUp/CreateAccountPage";
import LoginPage from "./pages/login/loginPage";
import AddNew from "./pages/landlordManagement/AddNew";
import LandlordManagement from "./pages/landlordManagement/LandlordManagement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signUp" element={<SwitchIdentityPage />}></Route>
          <Route path="/signUp/createAccount" element={<CreateAccountPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/post" element={<AddNew />}></Route>
          <Route
            path="/landlord-management"
            element={<LandlordManagement />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
