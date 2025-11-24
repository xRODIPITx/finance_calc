import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./views/Main";
import AdminPanel from "./views/AdminPanel";
import CalcInt from "./views/CalcInt";
import AdminLogin from "./views/AdminLogin";
import AdminCalcEdit from "./views/AdminCalcEdit";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/admin"
          element={<AdminLogin token={token} setToken={setToken} />}
        />
        <Route path="/admin/main" element={<AdminPanel />} />
        <Route path="/CalcInt/:id" element={<CalcInt />} />
        <Route path="/admin/edit/:id" element={<AdminCalcEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
