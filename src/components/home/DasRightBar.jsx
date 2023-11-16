import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import userService from '../../infrastructure/userService';
import { BiSearch } from "react-icons/bi";
import { RiVideoAddFill } from "react-icons/ri";
import { CgMoreAlt } from "react-icons/cg";
import './css/DasRightBar.css';
import Contacts from "../auth/Contacts";

const DasRightBar = (props) => {
    const formattedUsername = userService.formatUsername(props.firstName, props.lastName)
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
        </div>
      );
}

export default DasRightBar;