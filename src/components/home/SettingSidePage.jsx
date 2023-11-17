import React, { Fragment, lazy } from 'react';
import { NavLink } from 'react-router-dom';
import userService from '../../infrastructure/userService';
import iconFriend from '../../assets/images/friends.png'
import iconHome from '../../assets/images/home.png'
import iconMess from '../../assets/images/mess.png'
import './css/SettingSideBar.css';

const SettingSideBar = (props) => {
    const userId = userService.getUserId();
    // const loggedInUserProfilePicUrl = this.props.loggedInUser.profilePicUrl;
    // const imageClass = userService.getImageSize(loggedInUserProfilePicUrl);
    return (
        <Fragment >
            <div className="side-bar">
                <div><img className ="icon-side-bar" src = {iconFriend}></img><NavLink className="btn side-bar-child" exact to={`/setting/account/${userId}`} role="button">Tổng quan tài khoản</NavLink></div>
                <div><img className ="icon-side-bar" src = {iconHome}></img><NavLink className="btn side-bar-child" exact to={`/setting/profile/${userId}`} role="button">Chỉnh sửa hồ sơ</NavLink></div>
                <div><img className ="icon-side-bar" src = {iconMess}></img><NavLink className="btn side-bar-child" exact to={`/setting/pass/${userId}`} role="button">Mật khẩu và bảo mật</NavLink></div>
            </div>
        </Fragment>
    )
}


export default SettingSideBar;