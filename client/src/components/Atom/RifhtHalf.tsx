import React from "react";
import Cards from "./Cards";
import Input from "./Input";

const RifhtHalf = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-64 max-w-sm flex flex-col items-center border mt-10 px-5">
        <div className="text-2xl font-bold my-10">Get Sales Tips in Inbox</div>
        Weekly Updates with Sales and Cold Email Tricks, No Spam. Promise.
        <div className="flex items-center">
          <Input placeHolder={"Enter your email"} setInput title="" />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-0.5 mt-4 h-8 px-3 border border-blue-700 rounded-full mx-8">
            Subscribe
          </button>
        </div>
      </div>
      <div className="max-w-sm border my-10 flex flex-col items-center py-5">
        <div className="text-2xl font-bold  mb-5">Latest Posts</div>
        <div className="mx-5">
          <Cards title={undefined} user={undefined} createdAt={undefined} coverImage={undefined} id={0} />
          <br />
          <Cards title={undefined} user={undefined} createdAt={undefined} coverImage={undefined} id={0} />
          <br />
          <Cards title={undefined} user={undefined} createdAt={undefined} coverImage={undefined} id={0} />
        </div>
      </div>
      <div className=" p-4 w-full">
        <div className="text-2xl font-bold">Explore Categories</div>
        <div>Cold Call</div>
        <div>Cold Email</div>
        <div>CRM</div>
        <div>Lead Generation LinkedIn Outreach</div>
        <div>Sales</div>
        <div>Sales Tips</div>
        <div>Sales Book Summary</div>
      </div>
    </div>
  );
};

export default RifhtHalf;
