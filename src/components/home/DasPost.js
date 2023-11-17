import React, { Fragment, Component } from 'react';
import { userService } from '../../infrastructure';
import Comment from './Comment';

export default class DasPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsArr: this.props.friendsArr,
            id: this.props.id,
        };
    }
    render() {
    const imageClass = userService.getImageSize(this.props.imageUrl);
    const imageClassUserPick = userService.getImageSize(this.props.loggedInUserProfilePicUrl);

    let isRoot = userService.isRoot();
    let isPostCreator = (this.props.loggedInUserId === this.props.currentLoggedInUserId);
    let isTimeLineUser = (this.props.timelineUserId === this.props.currentLoggedInUserId);

    const dayTime = this.props.time.hour <= 12 ? 'AM' : 'PM';
    const month = this.props.time.month.substring(0, 1) + this.props.time.month.substring(1, 10).toLowerCase()
    const hour = this.props.time.hour < 10 ? '0' + this.props.time.hour : this.props.time.hour;
    const minute = this.props.time.minute < 10 ? '0' + this.props.time.minute : this.props.time.minute;

    const formattedName = userService.formatUsername(this.props.loggedInUserFirstName, this.props.loggedInUserLastName);
    return (

        <Fragment>
            <div className="post-wrapper" id="container">
                <div className="post-content-article-header ">
                    <div className="post-content-article-image">
                        <img className={imageClassUserPick} src={this.props.loggedInUserProfilePicUrl} alt="bender" />
                    </div>
                    <div className="post-content-article-description">
                        <p className="post-user-info">{formattedName} </p>
                        <p className="post-description">Lúc {hour}:{minute} {dayTime}, ngày {this.props.time.dayOfMonth} tháng {month}</p>
                    </div>
                </div>
                <div className="post-content">
                    <p className="">{this.props.content} </p>
                </div>

                {this.props.imageUrl != null && (
                    <div className="relative h-60 md:h-96 bg-neutral-700">
                        <img className={imageClass} src={this.props.imageUrl} objectFit="contain" layout="fill" alt="pic1"></img>
                    </div>
                )}

                <div className="post-footer">
                    <div className="post-left-side-icons-container">
                        <ul>
                            <li className="like-icon">
                                <div className="like-button" onClick={this.props.addLike.bind(this, this.props.postId)}> <i className="fas fa-thumbs-up"></i></div>
                            </li>
                            <li className="like-count">
                                <div >{this.props.likeCount}</div>
                            </li>
                            <li>
                                <i className="fas fa-share"> Chia sẻ</i>
                            </li>
                        </ul>
                    </div>

                    <div className="post-right-side-icons-container">
                        <div className="comment-icon">
                            <i className="fas fa-comments"></i>
                        </div>
                        <p>{this.props.commentList.length}</p>
                    </div>
                </div>

                {(isRoot || isPostCreator || isTimeLineUser) && <div onClick={this.props.removePost.bind(this, this.props.postId)}>
                    <div className="btn uiButtonGroup fbPhotoCurationControl  delete-button" ><i className="far fa-trash-alt "></i></div>
                </div>}
            </div>

            <div className="comment-wrapper" id="comment-container">
                {this.props.commentList.map((comment) =>
                    <Comment
                        key={comment.commentId}
                        addLikeComment={this.props.addLikeComment}
                        removeComment={this.props.removeComment}
                        timelineUserId={this.props.timelineUserId}
                        currentLoggedInUserId={this.props.currentLoggedInUserId}
                        {...comment}
                    />)}
            </div>
        </Fragment>
    )
}
}
