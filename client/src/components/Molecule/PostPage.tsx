import React, { useState, useEffect, ReactElement } from "react";
import LeftHalf from "../Atom/LeftHalf";
import RifhtHalf from "../Atom/RifhtHalf";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Atom/Loaders/Loader";
import { GET_POST_BY_ID } from "../../constants";

interface IPostData {
  comments: any;
  post: IPost;
  success: true;
}
interface IPost {
  coverImage: String;
  createdAt: String;
  text: String;
  title: String;
  user: String;
}
const PostPage = (): ReactElement => {
  const [postData, setPostData] = useState<IPostData>();
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const data = await axios.get(`${GET_POST_BY_ID}${id}`);
      setPostData(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {postData ? (
        <h1 className="text-3xl text-center my-10">{postData.post.title}</h1>
      ) : (
        <Loader />
      )}
      {postData && (
        <div className="flex flex-wrap flex-col lg:flex-row">
          <div className="flex-1 lg:ml-20 border rounded-t-lg">
            <LeftHalf
              text={postData.post.text}
              coverImage={postData.post.coverImage}
              comments={postData.comments}
            />
          </div>
          <div className=" lg:mr-20 lg:ml-10  border" style={{ flex: 0.5 }}>
            <RifhtHalf />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
