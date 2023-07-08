import React from "react";

const Post = ({ post }) => {
    const url =
      post && post.picture
        ? post.picture
        : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
  
    const addEllipsis = (str, limit) => {
      return str.length > limit ? str.substring(0, limit) + '...' : str;
    };
  
    return (
      <div className="flex flex-col items-center h-[362px] bg-gray-700 shadow-md m-1">
        <img
          src={url}
          alt="post"
          className="w-full object-cover h-40"
        />
        <p className="text-slate-200 text-xs px-2 py-1">
          {post.categories}
        </p>
        <h2 className="text-lg font-semibold px-2 py-1 text-white">
          {addEllipsis(post.title, 20)}
        </h2>
        <p className="text-gray-300 text-xs px-2 py-1">
          Author: {post.username}
        </p>
        <p className="text-sm break-words px-2 py-1 text-slate-300">
          {addEllipsis(post.description, 125)}
        </p>
      </div>
    );
  };
  
  export default Post;
  