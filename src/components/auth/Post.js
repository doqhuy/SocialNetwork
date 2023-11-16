
import React from "react";
import { FiThumbsUp } from "react-icons/fi";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { CgMoreAlt } from "react-icons/cg";

const Post = ({ post }) => {
  return (
    <div className="flex flex-col" key={""}>
      <div className="bg-neutral-700 mt-6 rounded-tr-lg rounded-tl-lg p-4">
        <div className="flex items-center space-x-2">
          {/* <img src={post.profilePic} className="rounded-full w-10 h-10" /> */}
          <div>
            {/* <p className="font-medium text-white">{post.name}</p> */}
            {/* <p className="text-xs text-slate-200">{post.timeStamp}</p> */}
          </div>
          <div className="flex items-center">
            <div className="invisible">
              <p>This is no buggggggggggggggggggggggg</p>
            </div>
          <div className="flex items-center min-w-fit d rounded-full ml-20 p-2 text-slate-100 bg-neutral-600 hover:bg-neutral-800 cursor-pointer">
            <CgMoreAlt />
          </div>
          </div>
        </div>
        {/* <p className="py-4 text-white">{post.post}</p> */}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-center rounded-br-lg rounded-bl-lg bg-neutral-700">
        <div className="flex items-center space-x-1 text-slate-100 hover:text-blue-500 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <FiThumbsUp className="h-4 "></FiThumbsUp>
          <p className="text-xs sm:text-base">Thích</p>
        </div>
        <div className="flex items-center space-x-1 text-slate-100 hover:text-green-500 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <FaRegCommentAlt className="h-4" />
          <p className="text-xs sm:text-base">Bình luận</p>
        </div>
        <div className="flex items-center space-x-1 text-slate-100 hover:text-red-500 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <RiShareForwardLine className="h-4" />
          <p className="text-xs sm:text-base">Chia sẻ</p>
        </div>
      </div>
      
    </div>
  );
};

export default Post;
