import React, { useState, useEffect } from "react";
import { Takshvedi } from "../../../assets/svgs";
import Input from "../../atoms/checkout/Input";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

//https://firebase.google.com/docs/auth/custom-email-handler   {refer this}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConformPassword] = useState("");
  const [resetCodeValid, setResetCodeValid] = useState(true);
  const [mode, setMode] = useState("");
  const [actionCode, setActionCode] = useState("");
  const [continueUrl, setContinueUrl] = useState("");
  const [lang, setLang] = useState("en");
  const [email, setEmail] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    fetchUrl();
  }, []);
  useEffect(() => {
    actionCode && handleResetPassword(auth, actionCode, continueUrl, lang);
  }, [actionCode]);

  function fetchUrl() {
    let paramMode = searchParams.get("mode");
    setMode(paramMode);
    let paramOobCode = searchParams.get("oobCode");
    setActionCode(paramOobCode);
    let paramContinueUrl = searchParams.get("continueUrl");
    setContinueUrl(paramContinueUrl);
    let paramLang = searchParams.get("lang");
    setLang(paramLang);
  }

  function handleResetPassword(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Verify the password reset code is valid.
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        console.log(email);
        setEmail(email);
      })
      .catch((error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.

        setError(
          "Invalid or expired action code.Try to generate the password Link again."
        );
        setResetCodeValid(false);
        // console.log(error);
      });
  }
  const handelSubmit = (e) => {
    e.preventDefault();
    const passwordPartten =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
    if (passwordPartten.test(password)) {
      if (password === ConfirmPassword) {
        setDisableButton(true);
      } else {
        setError("password and Confirm password must be same!");
      }
    } else {
      if (passwordPartten.test(password) === false) {
        setError(
          "password must be 8-16 Characters long and atleast contain a number, special character, lower case and upper case latter"
        );
      }
    }
  };

  return (
    <div>
      {email && (
        <div className="lg:flex justify-center items-center h-screen">
          <div className="bg-white lg:drop-shadow-2xl lg:shadow-2xl lg:w-1/3">
            <div className="flex justify-center mt-10 ">
              <Takshvedi size={1.5} />
            </div>
            <div className="my-5">
              {error && (
                <Alert
                  severity="error"
                  sx={{ paddingTop: 2, paddingBottom: 2 }}
                >
                  {error}
                </Alert>
              )}
              {success && <Alert>{success}</Alert>}
            </div>
            <div className="flex justify-center items-center">
              <form onSubmit={handelSubmit} className="mx-10 mb-10 w-full">
                {/* //show user email */}
                <div className="flex justify-center items-center text-gray-400">
                  {email}
                </div>
                <Input
                  title="Password"
                  placeHolder={"Password"}
                  setInput={setPassword}
                  required={true}
                  password={true}
                  passwordShow={true}
                />
                <Input
                  title="Confirm Password"
                  placeHolder={"Confirm Password"}
                  setInput={setConformPassword}
                  required={true}
                  password={true}
                />
                <button
                  type="submit"
                  className="px-10 mb-2 py-2 rounded-full bg-blue-600 text-white w-full h-12 mt-4"
                  disabled={disableButton}
                >
                  Change Password
                </button>
                <div className="mt-5 flex justify-center">
                  Remember password? &nbsp;<Link to={"/"}>login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {!resetCodeValid && (
        <div>
          <Alert severity="error">
            {error}
            <Link to={"/"} className="text-blue-600">
              Back to Home
            </Link>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
