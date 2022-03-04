import React, { useEffect, useState } from "react";
import Cards from "../Atom/Cards";
import axios from "axios";
import Loader from "../Atom/Loaders/Loader";
import { GET_ALL_POSTS, POSTS_PER_PAGE } from "../../constants";

const PostGrid = () => {
  const [postData, setpostData] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  //==========fetch when app load this page=================
  useEffect(() => {
    fetchPosts();
  }, []);

  //============fetch when current page changed===================
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  //============fetch functions===========================
  const fetchPosts = () => {
    setLoading(true);
    console.log(currentPage);
    axios
      .get(`${GET_ALL_POSTS}${currentPage}`)
      .then((res) => setpostData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // count current page
  const pages = postData && postData.postCount / POSTS_PER_PAGE;
  pages && console.log(pages);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6  mx-4 md:mx-8 lg:mx-24 mb-10 mt-16 ">
        {/* =====================load post data================================= */}
        {postData
          ? postData.posts.map(
              ({ title, createdAt, user, coverImage, _id }, ind) => {
                createdAt = createdAt.slice(0, 10);
                return (
                  <Cards
                    title={title}
                    createdAt={createdAt}
                    user={user && user.fullName}
                    id={_id}
                    coverImage={coverImage}
                    key={ind}
                  />
                );
              }
            )
          : null}
        <div className="absolute top-0 left-0">{loading && <Loader />}</div>
      </div>

      {/* =====================go  to next page========================= */}
      {pages > currentPage && (
        <span
          className="px-4 py-2 bg-gray-300"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          next
        </span>
      )}

      {/* =====================go back to previous page========================= */}
      {pages < currentPage && pages > 1 && (
        <span
          className="px-4 py-2 bg-gray-300 ml-5"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          previous
        </span>
      )}
    </div>
  );
};

export default PostGrid;
