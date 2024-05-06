import {
  useLocation,
  HashRouter,
  NavLink,
  Routes,
  Route,
  useNavigate,
  Outlet,
  useParams,
  BrowserRouter,
} from "react-router-dom";
import LandlordManagementAddNew from "./Pages/LandlordManagementAddNew";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>這是首頁</h1>}></Route>
          <Route path="/login" element={<h1>你在登入頁</h1>}></Route>
          <Route path="/signup" element={<h1>你在註冊頁</h1>}></Route>
          <Route path="/post" element={<LandlordManagementAddNew />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
