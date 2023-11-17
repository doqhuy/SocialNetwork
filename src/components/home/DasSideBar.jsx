import React, { Fragment, lazy } from 'react';
import { NavLink, Link } from 'react-router-dom';
import userService from '../../infrastructure/userService';
import iconFriend from '../../assets/images/friends.png'
import iconHome from '../../assets/images/home.png'
import iconMess from '../../assets/images/mess.png'
import './css/SettingSideBar.css';

const DasSideBar = (props) => {
    const userId = userService.getUserId();
    // const loggedInUserProfilePicUrl = this.props.loggedInUser.profilePicUrl;
    // const imageClass = userService.getImageSize(loggedInUserProfilePicUrl);
    return (
        <Fragment >
            <div className="side-bar">

            <div><img className ="icon-side-bar" src = {iconHome} alt="Trang chủ"></img>
                    <NavLink className="btn side-bar-child" exact to={`/dasbroad/${userId}`} role="button">
                        Trang chủ
                    </NavLink>
            </div>
            <div><img className ="icon-side-bar" src = {iconFriend}></img>
                    <NavLink className="btn side-bar-child" exact to={`/home/profile/${userId}`} role="button">
                        Trang cá nhân
                    </NavLink></div>
            <div><img className ="icon-side-bar" src = {iconMess}></img>
                    <div>
                         <a className="btn side-bar-child" href={`http://localhost:8000/add/${userId}`}>Tin nhắn</a>
                    </div>
                    </div>
            </div>
        </Fragment>
    )
}


export default DasSideBar;