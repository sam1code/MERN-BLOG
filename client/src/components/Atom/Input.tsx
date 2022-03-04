import React, { useState } from "react";
interface IProps {
  placeHolder: String;
  setInput: any;
  required?: Boolean;
  flag?: String;
  title: string;
  password?: Boolean;
  passwordShow?: Boolean;
}
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";

const Input = ({
  title,
  placeHolder,
  setInput,
  required,
  flag,
  password,
  passwordShow,
}: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [input, setInput] = React.useState("");
  // console.log(input);
  return (
    <div className="mb-4 mt-8">
      <label className=" text-sm mb-1 flex ml-2" htmlFor={title}>
        {title}
        {flag === "Institution" && (
          <div className="ml-2 text-gray-600">
            <HiOutlineOfficeBuilding size={20} />
          </div>
        )}
        {flag === "Email" && (
          <div className="ml-2 text-gray-600 " style={{ marginTop: "2px" }}>
            <AiOutlineMail size={18} />
          </div>
        )}
        {flag === "Phone" && (
          <div className="ml-2 text-gray-600 " style={{ marginTop: "2px" }}>
            <BsTelephone size={16} />
          </div>
        )}
        {required ? <div className="text-blue-700">&nbsp;*</div> : null}
      </label>
      <div className="relative flex mt-2 ">
        <input
          className={` appearance-none border-2 transform duration-300 ease-in-out focus-within:border-blue-500 rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id={title}
          type={password && !showPassword ? "password" : "text"}
          placeholder={`${placeHolder}`}
          onChange={(event) => setInput(event.target.value)}
        />

        {passwordShow && (
          <div
            className="absolute ml-5 flex z-10 rounded-full items-center right-0 mr-3 text-gray-400"
            style={{ marginTop: "14px" }}
            onClick={() => {
              showPassword ? setShowPassword(false) : setShowPassword(true);
            }}
          >
            {showPassword ? (
              <div className="-mt-1.5 cursor-pointer">
                <AiOutlineEyeInvisible size={23} />
              </div>
            ) : (
              <div className="-mt-1.5 cursor-pointer">
                <AiOutlineEye size={23} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
