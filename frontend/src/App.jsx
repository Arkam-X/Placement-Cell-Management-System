import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import TPODashboard from "./pages/tpo/TPODashboard";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/student" element={<StudentDashboard/>}/>
      <Route path="/tpo" element={<TPODashboard/>}/>
      <Route path="*" element={<h2>Page not found</h2>}/>
    </Routes>
    </BrowserRouter>
  )
};

export default App;
