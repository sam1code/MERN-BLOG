import React from "react";
import Logo from "../../Assets/Logo";
import { AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="text-gray-600 pt-7">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4  bg-white py-10">
        <div className="flex flex-col w-full ml-16">
          <Logo />
          <p className="mt-8 text-sm ">
            Drag and Drop to create high performing Automated Sales Outreach
            Campaigns. SalesBlink helps fill your sales pipeline by simplifying
            prospecting, outreach & closing all at one place.
          </p>
          <p className="flex justify-between mt-10 w-3/4">
            <div className="cursor-pointer">
              <AiFillYoutube />
            </div>
            <div className="cursor-pointer">
              <AiFillLinkedin />
            </div>
            <div className="cursor-pointer">
              <BsDiscord />
            </div>
            <div className="cursor-pointer">
              <BsTwitter />
            </div>
            <div className="cursor-pointer">
              <IoLogoInstagram />
            </div>
          </p>
        </div>
        <div className="flex w-full  items-center flex-col">
          <div>
            <p className="cursor-pointer">Support</p>
            <p className="mt-5 cursor-pointer">FAQ</p>
            <p className="mt-2 cursor-pointer">Contact Us</p>
          </div>
        </div>
        <div className="flex w-full md:mt-0 mt-10 items-center flex-col">
          <div>
            <p className="cursor-pointer">Company</p>
            <p className="mt-5 cursor-pointer">Home</p>
            <p className="mt-2 cursor-pointer">Blog</p>
            <p className="mt-2 cursor-pointer">Our Team</p>
            <p className="mt-2 cursor-pointer"> Preview</p>
          </div>
        </div>
        <div className="flex w-full md:mt-0 mt-10 items-center flex-col">
          <div>
            <p className="cursor-pointer">Legal</p>
            <p className="mt-5 cursor-pointer">Disclaimer</p>
            <p className="mt-2 cursor-pointer">Privacy Policy</p>
            <p className="mt-2 cursor-pointer">Terms and Conditions</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-10 mb-20 flex w-full justify-center ">
        © 2022 SalesBlink. All rights reserved. A FutureBlink Product.
      </div>
    </div>
  );
};

export default Footer;
