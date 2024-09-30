import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type TUserLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const initialLoginState = {
    email: "masud@gmail.com",
    password: "masud",
  };

  // redux
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [login] = useLoginMutation();

  // react
  const [loginData, setLoginData] = useState<TUserLogin>(initialLoginState);
  const navigate = useNavigate();
  const location = useLocation();

  // get previous path which user comes from
  const from = location?.state?.from || "/";
  const hash = location?.hash || "";
  from.hash = hash;
  // handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastLoginId = toast.message("logging in...");
    try {
      const res = await login(loginData).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("logged in successfully", {
        id: toastLoginId,
        duration: 2000,
      });
      navigate(`${from}${hash}`, { replace: true });
    } catch (error) {
      toast.error("Error while logging..." + error, { id: toastLoginId });
    }
  };

  // prevent login page open if user already logged in
  useEffect(() => {
    if (user?.userId) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user?.userId]);

  return (
    <div className="login-form">
      <div className="title">Login</div>
      <form onSubmit={handleLogin}>
        <div className="input-boxes">
          <div className="input-box">
            <i className="fas fa-envelope"></i>
            <input
              type="text"
              placeholder="Enter your email"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="input-box">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="text">
            <a href="#">Forgot password?</a>
          </div>
          <div className="button input-box">
            <input type="submit" value="Login" />
          </div>
          <div className="text sign-up-text">
            Don't have an account? <label htmlFor="flip">Sigup now</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
