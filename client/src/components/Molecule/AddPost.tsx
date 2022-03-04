import React, { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Atom/Input";
import axios from "axios";
import Loader from "../Atom/Loaders/Loader";
import { Alert } from "@mui/material";
import { ADD_POST, CLOUDINARY_API } from "../../constants";
import DragIMG from "../Atom/DragIMG";

const AddPost = (): ReactElement => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  //redirect to home page if not logged in
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) {
      navigate("/");
    } else {
      console.log(localUser);
    }
  }, []);

  //create post here
  const handleSubmit = async (event) => {
    event.preventDefault();
    const localUser = JSON.parse(localStorage.getItem("user"));
    setError("");
    if (!selectedFile) {
      setError("Please select a photo first");
      setLoading(false);
      return;
    }
    if (text.length < 300) {
      setError("text must be morethan 300");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "dev_setup");

    // adding photo to cloudinary
    setLoading(true);
    await fetch(CLOUDINARY_API, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((file) => {
        const data = {
          title: title,
          text: text,
          user: localUser.data.user._id,
          coverImage: file.url,
        };
        console.log(file.url);
        // creating post
        axios
          .post(`${ADD_POST}`, data, { withCredentials: true })
          .then((response) => {
            navigate(`/${response.data.post._id}`);
          })
          .catch((err) => {
            console.log(err.response.data.message);
            setError(err.response.data.message);
          });
      });
    setLoading(false);
  };

  // file select from input
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div>
      {/* =======================LOADER===================== */}
      {loading && (
        <div className="absolute top-0">
          <Loader />
        </div>
      )}
      <div className="text-xl lg:text-5xl text-center ">
        Create your Blog Post
      </div>

      {/* =======================ErrorS===================== */}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Input
          placeHolder={"Enter Title of the blog post"}
          title={"title of your post"}
          setInput={setTitle}
        />
        <label htmlFor="text">Write your blog</label>
        <textarea
          className={` appearance-none border-2 transform duration-300 ease-in-out focus-within:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="text"
          onChange={(e) => setText(e.target.value)}
        />
        {/* ====================Image DND and SHow================== */}
        {selectedFile ? (
          <img src={image} alt="" className="max-w-lg" />
        ) : (
          <DragIMG handleFileSelect={handleFileSelect} />
        )}
        <button className="w-full text-white bg-indigo-700 hover:bg-blue-700 py-3 rounded-full my-10">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
