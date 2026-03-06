import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, LogIn } from "./logpage.jsx";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
