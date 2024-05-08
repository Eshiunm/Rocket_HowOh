import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import LandlordManagementAddNew from "./Pages/LandlordManagementAddNew";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<h1>目前在首頁</h1>}></Route>
          <Route path="/login" element={<h1>你在登入頁</h1>}></Route>
          <Route path="/signup" element={<h1>你在註冊頁</h1>}></Route>
          <Route path="/post" element={<LandlordManagementAddNew />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
