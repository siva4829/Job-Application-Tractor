import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Dashboard from "./Pages/dashboard";
import Register from "./Pages/register";

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
