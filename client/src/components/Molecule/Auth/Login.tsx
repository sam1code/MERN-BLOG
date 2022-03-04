import React, { useState } from "react";
import Logo from "../../../Assets/Logo";
import { useNavigate } from "react-router-dom";
import Input from "../../Atom/Input";
import { ToastContainer } from "react-toastify";
import { Alert } from "@mui/material";
import axios from "axios";
import Loader from "../../Atom/Loaders/Loader";
import { LOGIN } from "../../../constants";

const Login = ({ setForgetPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotemail, setForgetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  React.useEffect(() => {
    setForgetPassword(forgotPassword);
  }, [forgotPassword]);

  // login handeler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setError("");
    if (!email) {
      setError("please enter email");
      return;
    }
    if (!password) {
      setError("please enter password");
      return;
    }
    setLoading(true);
    const userData = { email: email, password: password };
    try {
      const user = await axios.post(LOGIN, userData, { withCredentials: true });
      // console.log(user);
      setError("");
      setResult("logged In successfully");
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // forget password handler
  const handelForgetPass = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!email) {
      setError("please enter email");
      return;
    }
    try {
      const res = await axios.post(
        `https://sales-blink.herokuapp.com/api/password/forgot`,
        { email: email }
      );
      console.log(res);
      setError("");
      setResult(
        "link sent to your account please check and update password using postman"
      );
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="overflow-hidden xl:px-10">
      <div className="flex justify-center mt-5 ">
        <Logo />
      </div>
      {error && (
        <Alert severity="error" className="mt-10 -mb-8">
          {error}
        </Alert>
      )}
      {result && (
        <Alert security="success" className="mt-10 -mb-8">
          {result}
        </Alert>
      )}
      {loading && (
        <div className="fixed h-screen w-screen bg-black bg-opacity-70 overflow-hidden top-0 left-0 z-20 flex justify-center items-center">
          <Loader />
        </div>
      )}
      {forgotPassword ? (
        <>
          <form onSubmit={handelForgetPass} className="mt-16">
            <Input
              title="Email"
              placeHolder={"Email"}
              setInput={setForgetEmail}
              required={true}
            />
            <button
              type="submit"
              className="px-10 mb-2 py-2 rounded-full bg-blue-600 text-white w-full  h-12 mt-4"
            >
              Send Reset Link
            </button>
          </form>
          <p className="text-right w-full">
            remember password?
            <span
              className="text-blue-700 cursor-pointer text-right w-full"
              onClick={() => {
                setForgotPassword(false);
              }}
            >
              Login
            </span>
          </p>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-16">
            <Input
              title="Email"
              placeHolder={"Email"}
              setInput={setEmail}
              required={true}
            />

            <Input
              title="Password"
              placeHolder={"Password"}
              setInput={setPassword}
              required={true}
              password={true}
              passwordShow={true}
            />

            <button
              type="submit"
              className="px-10 mb-2 py-2 rounded-full bg-blue-600 text-white w-full  h-12 mt-4"
            >
              Login
            </button>
          </form>
          <p
            className="text-blue-700 cursor-pointer text-right w-full"
            onClick={() => {
              setForgotPassword(true);
            }}
          >
            forgot password?
          </p>

          <div className="flex w-full text-center pl-7 mt-4">
            <hr className="mt-4 w-5/12" />
            <p className="w-1/12 mt-1  text-gray-600 text-sm">or</p>
            <hr className="mt-4 w-5/12" />
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
