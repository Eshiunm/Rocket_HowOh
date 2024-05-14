import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import SignUpSwitchIdentityPage from "./pages/signUp/SignUpSwitchIdentityPage";
import CreateAccountPage from "./pages/signUp/CreateAccountPage";
import CurrentStep from "./components/signUp/CurrentStep";
import AddNew from "./pages/landlordManagement/AddNew";
import LandlordManagement from "./pages/landlordManagement/LandlordManagement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<h1>你在登入頁</h1>}></Route>
          <Route path="/signUp" element={<SignUpSwitchIdentityPage />}></Route>
          <Route path="/signUp/createAccount" element={<CreateAccountPage />}>
            <Route path=":currentStep" element={<CurrentStep />}></Route>
          </Route>

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
