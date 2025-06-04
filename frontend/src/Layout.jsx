import HeroSection from "./components/home/HeroSections"
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Home from "./Home";
import Register from "./components/Auth/Register";

export default function layout() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      {/* <Route path="/quiz" element={<Quiz />} />
      <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
    </div>
  )
}
