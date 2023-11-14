import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import BackButton from './BackButtonWithProps';
import socialMedia from '../../assets/images/favion_instaface.png';
import './css/ErrorPage.css';
import { userService } from '../../infrastructure'

export default class ErrorPage extends Component {
    constructor(props) {
        super(props)
    }
    render = () => {
        let isAuthenticated = userService.isAuthenticated();
        const errorClass = isAuthenticated ? '': 'error-page-content-section-unauthorized';
        
        return (
            <article className="main-article-shared-content">
                <section className={`error-page-content-section ${errorClass}`}>
                    <div className="container error-page-container text-center col-md-12 text-center mb-5">
                        {/* <div className="container text-center pt-5 mt-5"> */}
                        <h2 className="text-center  mt-4" style={{ 'margin': '1rem auto' }}>Trang này không có sẵn</h2>
                        <h4>Vui lòng đăng nhập lại</h4>
                        <div className="image-wrapper mt-5">
                            <img src={socialMedia} alt="pic" />
                        </div>
                        <div className="text-center mt-5">
                            <NavLink
                                className="btn App-button-primary btn-lg m-3"
                                to="/"
                                role="button">
                                Quay lại trang đăng nhập
                            </NavLink>
                        </div>
                    </div>
                </section>
            </article>
        )
    }
}

