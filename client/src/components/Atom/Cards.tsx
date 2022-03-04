import React from "react";
import Img from "../../Assets/mock.jpeg";
import { GoCalendar } from "react-icons/go";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface IPostCard {
  title: String;
  user: String;
  createdAt: String;
  coverImage: String;
  id: number;
}

const Cards = ({ title, user, createdAt, coverImage, id }: IPostCard) => {
  const navigate = useNavigate();

  return (
    <div className="shadow-md  rounded-lg  bg-white max-w-sm">
      <img
        src={coverImage || Img}
        alt=""
        className="w-full h-52 rounded-t-lg "
      />
      <div className="mx-9 mt-10 ml-2 mr-4">
        <p className="text-xl font-semibold mt-4  ">{title}</p>

        <div className="h-16 flex items-center justify-between text-gray-500 cursor-pointer">
          <p className="flex items-center">
            <div className="mt-0.5 ">
              <GoCalendar size={18} />
            </div>
            &nbsp; {createdAt}
          </p>
          <p
            className="flex items-center cursor-pointer"
            onClick={() => {
              navigate(`/${id}`);
            }}
          >
            &nbsp; {user}
            <div className="mt-1">
              <AiOutlineRight />
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
