import React from "react";
import Img from "../../Assets/mock.jpeg";
import Comment from "./Comment";
import Input from "./Input";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loaders/Loader";
import { CREATE_COMMENT } from "../../constants";

export interface ICommentArray {
  text: String;
  coverImage: String;
  comments: Array<IComments>;
}
interface IComments {
  commentText: String;
  postId: String;
  user: IUser;
}
interface IUser {
  _id: String;
  fullName: String;
}

const LeftHalf = ({ text, coverImage, comments }: ICommentArray) => {
  const [comment, setComment] = React.useState(comments);
  const [comment_Text, setComment_Text] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>();
  const { id } = useParams();

  const commentSubmit = async (e) => {
    e.preventDefault();
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) {
      toast.error("not signed in");
      return;
    }
    try {
      setLoading(true);
      const commentAdd = await axios.post(
        CREATE_COMMENT,
        {
          commentText: comment_Text,
          postId: id,
          id: localUser.data.user._id,
        },
        { withCredentials: true }
      );
      toast.success("comment added!");
      comment.unshift({
        commentText: comment_Text,
        postId: "",
        user: {
          _id: localUser.data.user._id,
          fullName: localUser.data.user.fullName,
        },
      });
      e.target.value("");
      setComment(comment);
    } catch (error) {
      console.log(JSON.parse(error));
      toast.error("something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <img src={coverImage || Img} alt="" className="w-full rounded-t-lg" />
        <p className="p-4 my-10">{text}</p>
      </div>
      {loading && (
        <div className="fixed z-50 top-0">
          <Loader />
        </div>
      )}
      <div>
        <form onSubmit={commentSubmit}>
          <Input
            placeHolder={"Comment"}
            setInput={setComment_Text}
            title="Comment"
          />
          <button className="bg-indigo-700 hover:bg-blue-700 px-4 py-2 rounded-full text-white">
            comment
          </button>
        </form>
      </div>
      {comment &&
        comment.map((comment, ind) => {
          return <Comment comment={comment} key={ind} />;
        })}
      <ToastContainer />
    </div>
  );
};

export default LeftHalf;
