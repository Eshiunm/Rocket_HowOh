import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";
import LandlordManagementAddNew from "./Pages/LandlordManagementAddNew";
import LandlordManagement from "./Pages/LandlordManagement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<h1>你在登入頁</h1>}></Route>
          <Route path="/signup" element={<h1>你在註冊頁</h1>}></Route>
          <Route path="/post" element={<LandlordManagementAddNew />}></Route>
          <Route path="/landlord-management" element={<LandlordManagement />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
