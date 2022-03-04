import React, { useState } from "react";
import LogIn from "./Auth/Login";
import Signup from "./Auth/Signup";
import { IoCloseOutline } from "react-icons/io5";
import Backdrop from "../Atom/Backdrop";
interface ILogin {
  login: any;
  setmodalOpen?: any;
}

const Login = ({ login, setmodalOpen }: ILogin) => {
  const [loginMode, setLoginMode] = useState(true);
  const [forgetPassword, setForgetPassword] = useState(false);

  React.useEffect(() => {
    login ? setLoginMode(true) : setLoginMode(false);
  }, [login]);
  return (
    <div className=" w-screen flex justify-center items-center h-screen overflow-hidden">
      <Backdrop />
      <div className="flex flex-col justify-center items-center overflow-hidden">
        <div
          className="fixed w-full  sm:w-96 md:w-1/3 bg-white px-5 py-5  rounded-md z-50  overflow-x-hidden"
          style={{ height: "90vh" }}
        >
          <div className="relative">
            <div
              className="absolute cursor-pointer right-0 text-2xl -mt-2"
              onClick={() => setmodalOpen(false)}
            >
              <IoCloseOutline />
            </div>
          </div>
          {loginMode ? (
            <LogIn setForgetPassword={setForgetPassword} />
          ) : (
            <Signup />
          )}
          <br />
          {!forgetPassword && (
            <div className="flex justify-center items-center text-xs -mt-4">
              {loginMode ? (
                <p className="flex">
                  don't have an account yet ?
                  <p
                    className="cursor-pointer text-blue-800 ml-1 "
                    onClick={() => {
                      setLoginMode(false);
                    }}
                  >
                    signup
                  </p>
                </p>
              ) : (
                <p className="flex">
                  already have an account?
                  <p
                    className="cursor-pointer text-blue-800 ml-1"
                    onClick={() => {
                      setLoginMode(true);
                    }}
                  >
                    Login
                  </p>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
