import React from "react";
import { BiSearch } from "react-icons/bi";
import { RiVideoAddFill } from "react-icons/ri";
import { CgMoreAlt } from "react-icons/cg";
import Contacts from "./Contacts";
import '../auth/css/RightSideBar.css';

const RightSidebar = () => {
  return ( 
    <div className="right-side-bar">
      <div className="right-side-bar-header">
        <p>Liên hệ</p>
        <div className="right-side-bar-icon">
          <div className="icon">
            <RiVideoAddFill />
          </div>
          <div className="icon">
            <BiSearch />
          </div>
          <div className="icon">
            <CgMoreAlt />
          </div>
        </div>
      </div>
      <Contacts
        name="Do Huy"
        src=""
        status="online"
      />
      <Contacts
        name="Do Huy"
        src=""
        status="offline"
      />
      <Contacts
        name="Do Huy"
        src=""
        status="online"
      />
    </div>
  );
};

export default RightSidebar;
