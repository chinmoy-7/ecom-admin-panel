import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./scene/dashboard/Dashboard";
import { Login } from "./component/Login";
import { Signup } from "./component/Signup";
// import  {AuthContextProvider}  from "./context/AuthContext";
import { AuthContextProvider } from "./context/AuthContext";
import { DashboardContextProvider } from "./context/DashBoardContext";
function App() {
  return (
    <>
    <BrowserRouter>
    <AuthContextProvider>
      <DashboardContextProvider>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </DashboardContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
