//import Image from "next/image";
import { React, useState, useRef } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
//import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
//import axios from 'axios';
//import { addPost, selectPost } from "../public/src/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import '../auth/css/CreatePost.css';

const CreatePost = () => {
  const InstaFace_ENDPOINT = "http://localhost:8080/api/v1/post";
  const { data: session, status } = 1;//useSession();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const hiddenFileInput = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    const formData = new FormData();

    formData.append("file", imageToPost);
    console.log("imagetopost: " + imageToPost);
    formData.append("post", inputRef.current.value);
   formData.append("name", session?.user.name);
    formData.append("email", session?.user.email);
    formData.append("profilePic", session?.user.image);

    // axios.
    //   post(InstaFace_ENDPOINT, formData, {
    //     headers: { Accept: "application/json" },
    //   })
    //   .then((response) => {
    //     inputRef.current.value = "";
    //     dispatch(addPost(response.data));
    //     console.log(response.data);
    //     removeImage();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        setImageToPost(e.target.result);
      };
    }
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="create-post">
      <div className="create-post-main">
        {/* <Image
          src={`${session?.user.image}`}
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
        /> */}
        <form className="create-post-input">
          <input
            className=""
            type="text"
            ref={inputRef}
            placeholder={` Hôm nay bạn thế nào, ${session?.user.name}?`}></input>
        </form>
        <button onClick={handleSubmit} className="rounded-l-xl rounded-r-xl h-8 w-20 bg-gray-100 flex-center hover:bg-neutral-500 hover:text-slate-100">
            Đăng bài
          </button>
      </div>
      {imageToPost && (
        <div
          onClick={removeImage}
          className="">
          <img src={imageToPost} className="h-24 bg-gray-500 object-contain" />
          <div className="flex items-center h-6 space-x-1 flex-grow">
            <RiDeleteBin6Line className="h-10 text-red-500"/>
            <p className="font-semibold text-slate-100 hover:text-red-500">Xóa ảnh/video</p>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center">
        <div
          onClick={handleClick}
          className="create-post-button">
          <IoMdPhotos className="create-post-buttonimg" size={30} />
          <input
            ref={hiddenFileInput}
            onChange={addImageToPost}
            type="file"
            accept="image/*"
            hidden
          />
        </div>
        {/* <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:cursor-pointer hover:bg-gray-100 rounded-md">
          <BsEmojiSmile className="text-yellow-400" size={20} />
          <p className="font-semibold text-slate-100 hover:text-yellow-400">Feeling/Activity</p>
        </div> */}
      </div>
    </div>
  );
};

export default CreatePost;
