import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const SignIn = () => {
  const navigate = useNavigate();
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
          <input type="email" className="email" placeholder="email" />
          <input type="password" className="password" placeholder="password" />
          <button className="submit">Signup</button>
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
          <input type="email" className="email" placeholder="email" />
          <input type="password" className="password" placeholder="password" />
          <button className="submit">Login</button>
        </div>
      </Box>
    </>
  );
};

export { SignIn, LogIn };
