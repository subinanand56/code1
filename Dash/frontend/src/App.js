import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Auth/Login";
import { AuthProvider } from "./context/auth";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import Request from "./pages/Employee/Request";
import SalesDash from "./pages/Employee/SalesDash";
import ExpenseDash from "./pages/Employee/ExpenseDash";
import MsalesDash from "./pages/Manager/MsalesDash";
import MexpenseDash from "./pages/Manager/MexpenseDash";
import AdminBranches from "./pages/Admin/AdminBranches";
import AdminEmployees from "./pages/Admin/AdminEmployees";
import AdminProducts from "./pages/Admin/AdminProducts";
import Register from "./pages/Auth/Register";
import Latest from "./pages/Latest";
import Sports from "./pages/Sports";
import AdminSalesdash from "./pages/Admin/AdminSalesdash";
import AdminExpensedash from "./pages/Admin/AdminExpensedash";
import AdminPurcahseDash from "./pages/Admin/AdminPurcahseDash";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<HomePage />} />
          <Route path="/latest"element={<Latest />} />
          <Route path="/sports"element={<Sports />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/*" element={<Pagenotfound/>}/>
          <Route path="/employee-dashboard" element={<EmployeeDashboard/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard/>} />
          <Route path="/request" element={<Request/>} />
          <Route path="/esalesdash" element={<SalesDash/>} />
          <Route path="/eexpensedash" element={<ExpenseDash/>} />
          <Route path="/msalesdash" element={<MsalesDash/>} />
          <Route path="/mexpensedash" element={<MexpenseDash/>} />
          <Route path="/adminbranches" element={<AdminBranches/>} />
          <Route path="/adminsales" element={<AdminSalesdash/>} />
          <Route path="/adminexpense" element={<AdminExpensedash/>} />
          <Route path="/adminpurchase" element={<AdminPurcahseDash/>} />
          <Route path="/adminemployees" element={<AdminEmployees/>} />
          <Route path="/adminproducts" element={<AdminProducts/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
