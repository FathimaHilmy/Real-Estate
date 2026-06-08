import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, LogIn } from "./logpage.jsx";
import Main from "./mainpage.jsx";
import Create from "./create.jsx";
import Update from "./update.jsx";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/main" element={<Main />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
