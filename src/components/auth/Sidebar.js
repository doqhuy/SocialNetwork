import React from "react";
import { FiUsers } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import './css/Sidebar.css';

//import Image from "next/image";
//import { useSession } from "next-auth/react";

const Sidebar = (props) => {
  //const { data: session, status } = useSession();
  return (
    <div className="side-bar">
      <div className="side-bar-child">
        <p>Trang chủ</p>
      </div>
      <div className="side-bar-child">
        <p>Tin nhắn</p>
      </div>
      <div className="side-bar-child">
        <p>Trò chơi</p>
      </div>
      <div className="side-bar-child">
        <p>Bạn bè</p>
      </div>
      
    </div>
  );
};

export default Sidebar;
