import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import TPODashboard from "./pages/tpo/TPODashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CompanyList from "./pages/student/CompanyList";
import MyApplications from "./pages/student/MyApplications";
import AddCompany from "./pages/tpo/AddCompany";
import Applicants from "./pages/tpo/Applicants";
import TPOCompanyList from "./pages/tpo/CompanyList";
import StudentsTable from "./pages/tpo/StudentsTable";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route path="/student" element={<ProtectedRoute allowedRoles={["STUDENT"]}> <StudentDashboard/> </ProtectedRoute>}/>
      <Route path="/student/companies" element={<ProtectedRoute allowedRoles={["STUDENT"]}> <CompanyList /> </ProtectedRoute>}/>
      <Route path="/student/applications" element={ <ProtectedRoute allowedRoles={["STUDENT"]}> <MyApplications /> </ProtectedRoute>}/>

      <Route path="/tpo" element={<ProtectedRoute allowedRoles={["TPO"]}> <TPODashboard/> </ProtectedRoute>}/>
      <Route path="/tpo/add-company" element={<ProtectedRoute allowedRoles={["TPO"]}> <AddCompany/> </ProtectedRoute>}></Route>
      <Route path="/tpo/companies" element={<ProtectedRoute allowedRoles={["TPO"]}> <TPOCompanyList/> </ProtectedRoute>}></Route>
      <Route path="/tpo/applicants/:companyId" element={<ProtectedRoute allowedRoles={["TPO"]}> <Applicants/> </ProtectedRoute>}></Route>
      <Route path="/tpo/students" element={<ProtectedRoute allowedRoles={["TPO"]}> <StudentsTable/> </ProtectedRoute>}/>

      <Route path="*" element={<h2>Page not found</h2>}/>
    </Routes>
    </BrowserRouter>
  )
};

export default App;
