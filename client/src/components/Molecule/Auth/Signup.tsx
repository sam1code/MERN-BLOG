import React, { useState } from "react";
import Input from "../../Atom/Input";
import { Alert } from "@mui/material";
import Loader from "../../Atom/Loaders/Loader";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  //signup user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !(password === conformPassword)) {
      setError("please enter correct credentials");
      return;
    }
    setLoading(true);
    const userData = {
      email,
      password,
      conformPassword,
      fullName: name,
    };
    try {
      const user = await axios.post(
        `https://sales-blink.herokuapp.com/api/register`,
        userData
      );
      localStorage.setItem("user", JSON.stringify(user));
      setError("");
      setResult("Regestered In successfully");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-76 overflow-y-auto xl:px-10">
      <div className="text-center">
        <p className="text-3xl font-semibold text-gray-700 mt-7">Sign up</p>
      </div>

      {loading && (
        <div className="fixed h-screen w-screen bg-black bg-opacity-70 overflow-hidden top-0 left-0 z-20 flex justify-center items-center">
          <Loader />
        </div>
      )}
      {result && (
        <Alert security="success" className="mt-10 -mb-8">
          {result}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="">
        <Input
          title="Full Name"
          placeHolder={"Full Name"}
          setInput={setName}
          required={true}
        />

        <Input
          title="Email"
          placeHolder={"someone@mail.com"}
          setInput={setEmail}
          required={true}
          flag={"Email"}
        />
        <Input
          title="Password"
          placeHolder={"Password"}
          setInput={setPassword}
          required={true}
          password={true}
        />

        <Input
          title="Confirm Password"
          placeHolder={"Confirm Password"}
          setInput={setConformPassword}
          required={true}
          password={true}
        />
        {error && (
          <Alert severity="error" className="mt-6 mb-2">
            {error}
          </Alert>
        )}
        <button
          type="submit"
          className="px-10 mb-2 py-2 rounded-full bg-blue-600 text-white w-full h-12 mt-4"
          // disabled={true}
        >
          Signup
        </button>
      </form>
      
    </div>
  );
};

export default Signup;
