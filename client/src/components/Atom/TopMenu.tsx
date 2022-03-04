import React, { useEffect, useState } from "react";
import Logo from "../../Assets/Logo";
import { MdOutlineMenuOpen } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import Login from "../Molecule/Login";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { LOGOUT } from "../../constants";

const TopMenu = () => {
  const [menuClicked, setMenuClicked] = useState<boolean>();
  const [signupMode, setSignupMode] = useState<boolean>(false);
  const [loginMode, setLoginMode] = useState<boolean>(false);
  const [loggedin, setLoggedIn] = useState<boolean>(false);
  let navigate = useNavigate();

  //some class constants
  const navclass =
    "my-2 py-2 w-full  rounded-full bg-gray-300 text-md cursor-pointer";
  const lgNavClass = "mr-5 lg:mr-10 lg:text-base text-sm cursor-pointer";
  // checking local storage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
    }
  }, [loginMode]);
  // logout
  const handelLogout = () => {
    axios
      .get(LOGOUT)
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("user");
        setLoggedIn(false);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div
      className="flex  md:justify-around items-center justify-evenly shadow-lg h-16 overflow-hidden"
      style={{ backgroundColor: "F8F9FC" }}
    >
      <div className=" w-48">
        <Logo />
      </div>

      <div className="hidden lg:flex items-center">
        <div className="justify-between flex">
          <Link to={"/"} className={lgNavClass}>
            HOME
          </Link>
          <p className={lgNavClass}>ABOUT</p>
          {loggedin && (
            <Link className={lgNavClass} to={"/post/new"}>
              WRITE A BLOG
            </Link>
          )}
          <p className={lgNavClass}>CONTACT</p>
        </div>
      </div>
      {!loggedin ? (
        <div className="block">
          <button
            className="lg:bg-indigo-600 lg:hover:bg-indigo-700 lg:text-white lg:font-bold lg:py-2 lg:px-8 lg:border lg:border-blue-700 lg:rounded-lg lg:mx-8"
            onClick={() => setSignupMode(true)}
          >
            sign up
          </button>
          <button
            className="bg-white hover:bg-gray-400 text-indigo-700 font-bold lg:py-2 py-1 lg:px-8 px-2 ml-2 border border-blue-700 rounded-lg"
            onClick={() => {
              setLoginMode(true);
            }}
          >
            log in
          </button>
        </div>
      ) : (
        <button
          className="bg-white hover:bg-gray-400 text-indigo-700 font-bold lg:py-2 py-1 lg:px-8 px-2 ml-2 border border-blue-700 rounded-lg"
          onClick={handelLogout}
        >
          log Out
        </button>
      )}
      <div
        className="block lg-hidden lg:hidden"
        onClick={() => {
          menuClicked ? setMenuClicked(false) : setMenuClicked(true);
        }}
      >
        {menuClicked ? (
          <MdOutlineMenuOpen size={30} cursor="pointer" />
        ) : (
          <FiMenu size={28} cursor="pointer" />
        )}
      </div>
      {menuClicked && (
        <div
          className="absolute  h-screen w-full bg-black bg-opacity-75 lg:hidden z-50"
          style={{ top: "4.1rem" }}
        >
          <div className="flex flex-col fixed items-center text-center w-full ">
            <Link to={"/"} className={navclass}>
              HOME
            </Link>
            <p className={navclass}>ABOUT</p>
            {loggedin && (
              <Link className={navclass} to={"/post/new"}>
                WRITE A BLOG
              </Link>
            )}
            <p className={navclass}>CONTACT</p>
          </div>
        </div>
      )}
      {signupMode || loginMode ? (
        <div className="fixed top-0 mt-8 lg:mt-0">
          <Login
            login={signupMode ? false : true}
            setmodalOpen={signupMode ? setSignupMode : setLoginMode}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TopMenu;
