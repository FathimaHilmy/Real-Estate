import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });

  const handlesignupData = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const onSignup = async () => {
    try {
      console.log("data", signupData);
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("signup failed");
      } else {
        alert("signup success");
      }
      setSignupData({ email: "", password: "" });
    } catch (error) {
      console.log("error occured", error);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: 450,
          height: 450,
          borderRadius: 1,
          bgcolor: "#f8efefff",
          left: 200,
        }}
      >
        <div className="cont">
          <div className="signup">
            <h1>Signup</h1>
          </div>
          <input
            type="email"
            className="email"
            value={signupData.email}
            name="email"
            onChange={handlesignupData}
            placeholder="email"
          />
          <input
            type="password"
            className="password"
            placeholder="password"
            name="password"
            value={signupData.password}
            onChange={handlesignupData}
          />
          <button className="submit" onClick={onSignup}>
            Signup
          </button>
          <p className="statement">
            Already have an account?
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </p>
        </div>
      </Box>
    </>
  );
};

const LogIn = () => {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const onLogin = async () => {
    try {
      console.log("data", loginData);
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        alert("login failed");
      } else {
        alert("login success");
        window.location.href = "/main";
        localStorage.setItem("token", data.token);
      }
      setloginData({ email: "", password: "" });
    } catch (error) {
      console.log("error occured", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 450,
          height: 420,
          borderRadius: 1,
          bgcolor: "#f8efefff",
          left: 200,
        }}
      >
        <div className="cont">
          <div className="signup">
            <h1>Login</h1>
          </div>
          <input
            type="email"
            className="email"
            placeholder="email"
            name="email"
            value={loginData.email}
            onChange={handleLogin}
          />
          <input
            type="password"
            className="password"
            placeholder="password"
            name="password"
            value={loginData.password}
            onChange={handleLogin}
          />
          <button className="submit" onClick={onLogin}>
            Login
          </button>
        </div>
      </Box>
    </>
  );
};

export { SignIn, LogIn };
