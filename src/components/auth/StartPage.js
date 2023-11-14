import React from 'react';
import { NavLink } from 'react-router-dom';
import userService from '../../infrastructure/userService';
import './css/StartPage.css';

const StartPage = () => {
    const isAdmin = userService.isAdmin();
    const isRoot = userService.isRoot();
    const currentUserId = userService.getUserId();
    let StartPageView;

    if (!localStorage.getItem('token')) {
        StartPageView = (
            <div>
                <div className="container text-center start-page-margin" >
                    <div className="jumbotron bg-light text-dark text-center mb-2 mt-5 mx-auto  jumbo-wrapper">
                        <h2 className="h1 h1-responsive" id="tille">InstaFace - Mạng xã hội mới cho thời đại mới</h2>
                        <p className="lead">
                            <NavLink className="btn App-button-primary btn-lg m-3" to="/login" role="button">Đăng nhập</NavLink>
                        </p>
                        <p className="lead">
                            <NavLink className="btn App-button-primary btn-lg m-3" to="/register" role="button">Tạo tài khoản</NavLink>
                        </p>
                    </div>
                </div>
            </div >
        )
    } else {
        StartPageView = (
            <div>
                <div className="containertext-center start-page-margin" >
                    <div className="row align-items-start mb-0 mt-5">
                       
                        <h3 className="md-display-5 h3 h3-responsive mb-3">Hello {userService.getUsername()}</h3>
                        <img className="imgStartPage" src={userService.getProfilePicUrl()}></img>
                        <h2 className="h1 h1-responsive">InstaFace - Mạng xã hội mới cho thời đại mới!</h2>
                        <p className="lead">
                            <NavLink className="btn App-button-primary btn-lg m-3" to={`/home/comments/${currentUserId}`} role="button">Bản tin</NavLink>
                            <NavLink className="btn App-button-primary btn-lg m-3" to={`/home/profile/${currentUserId}`} role="button">Trang cá nhân</NavLink>
                            {(isAdmin || isRoot) && <NavLink className="btn App-button-primary btn-lg m-3" to={`/home/users/all/${userService.getUserId()}`} role="button">Danh sách người dùng</NavLink>}
                        </p>
                    </div>
                </div>
            </div>
           
        )
    }

    return (
        <div className="container text-center pt-5">
            {StartPageView}
        </div>

    )
}

export default StartPage;