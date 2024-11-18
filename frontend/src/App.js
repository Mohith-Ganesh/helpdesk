import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./Signup/Signup";
import { Signin } from "./Signin/Signin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Customer from "./Dashboard/Customer/Customer";
import Admin from "./Dashboard/Admin/Admin";
import CustomerServiceAgent from "./Dashboard/CustomerServiceAgent/CustomerServiceAgent";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/customer-dashboard" element={<ProtectedRoute element={Customer}/>}/>
        <Route path="/admin-dashboard" element={<ProtectedRoute element={Admin}/>}/>
        <Route path="/agent-dashboard" element={<ProtectedRoute element={CustomerServiceAgent}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
