import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import userService from '../../infrastructure/userService';
import iconIntroduction from '../../assets/images/introduction.png'
import iconHome from '../../assets/images/home.png'
import iconMap from '../../assets/images/map.png'
import './css/Intro.css';

const Intro = (props) => {
    const formattedUsername = userService.formatUsername(props.firstName, props.lastName)
    return (
        <Fragment >
            <article className="aside-article-intro">
                <div className="aside-article-header">
                    <div className="aside-article-icon">
                        <img className = "iconIntro" src = {iconIntroduction}></img>
                    </div>
                    <h3 className="aside-article-title">Giới thiệu</h3>
                </div>

                <div className="hr-styles" style={{'width': '100%'}}></div>

                <div className="tille1 aside-intro-content text-center">
                    {/* <h4 className="occupation">{formattedUsername}</h4> */}
                    <h5 className="">{props.info}</h5>
                </div>
                <div className="hr-styles" style={{'width': '100%'}}></div>
                <div className="aside-intro-content">
                    <img className = "iconHome" src = {iconHome}></img><h4>Sống tại {props.address}</h4>
                    <img className = "iconHome" src = {iconMap}></img><h4>Đến từ {props.city}</h4>
                </div>

                <button className="container button update-info">
                    <NavLink className="about" exact to={`/home/profile/${props.id}`}>Chỉnh sửa chi tiết</NavLink>
                </button>
            </article>
        </Fragment>
    )
}

export default Intro;