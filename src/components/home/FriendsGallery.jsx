import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from '../../infrastructure';
import placeholder_user_image from '../../assets/images/placeholder.png';
import iconImage from '../../assets/images/friends.png'

const FriendsGallery = (props) => {
    return (
        <Fragment >
            <article className="aside-article-friends">
                <div className="aside-article-header">
                <div className="aside-article-icon">
                        <img className = "iconIntro" src = {iconImage}></img>
                    </div>
                    <h3 className="aside-article-title" style={{ color: ' #fff' }}>
                            Bạn bè &bull; {props.friendsArr.length}
                    </h3>
                </div>
                <div className="hr-styles" style={{'width': '90%'}}></div>
                <ul className="aside-article-gallery ">
                    {props.friendsArr.map(friend => {
                        const profilePicUrl = friend.profilePicUrl || placeholder_user_image
                        const imageClassName = userService.getImageSize(profilePicUrl);
                        let formattedUsername = '';
                        if(friend.firstName.length > 10){
                            formattedUsername = userService.formatUsername(friend.firstName,'', 10)
                        }else{
                             formattedUsername = userService.formatUsername(friend.firstName, friend.lastName, 15)
                        }
                        return (
                            <li key={friend.id}>
                                <NavLink to="#"><img className={imageClassName} src={profilePicUrl} alt="Pic" /></NavLink>
                                <div className="img-details"><p className="user-name">{formattedUsername}</p> </div>
                            </li>)
                    })}
                </ul>
                <button className="container button update-info">
                    <NavLink className="friends " exact to={`/home/friends/${props.timeLineUserId}`}>Xem danh sách bạn bè</NavLink>
                </button>
            </article>
        </Fragment>
    )
}

export default FriendsGallery;

