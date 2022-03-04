import React from "react";
import { FaUserAlt } from "react-icons/fa";

const Comment = ({ comment }) => {
  return (
    <div className="mt-5 mx-5">
      <div className="flex items-center">
        <FaUserAlt color="grey" />
        &nbsp;&nbsp;
        {comment.user.fullName}
      </div>
      <div className="text-sm mt-1 flex items-center">
        {comment.commentText}
      </div>
    </div>
  );
};

export default Comment;
