import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import  userService  from '../../infrastructure/userService';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import MessageNavBarRow from './MessageNavbarRow';
import iconFriend from '../../assets/images/friends.png'
import iconSearch from '../../assets/images/search.png'
import iconMess from '../../assets/images/mess.png'
import Logo from '../../../src/assets/images/favion_instaface.png'
import './css/MessageNavbarRow.css';
import './css/Navbar.css';

import { connect } from 'react-redux';
import { fetchAllUnreadMessagesAction, triggerMessageLoadAction } from '../../store/actions/messageActions';
import { searchResultsAction } from '../../store/actions/userActions';

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            showDropdown: '',
            unreadMessages: 0,
            displayMessageCount: true,
            allUnreadMessages: [],
        }

        this.searchFriend = this.searchFriend.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getAllFriendMessages = this.getAllFriendMessages.bind(this);
        this.triggerMessageLoad = this.triggerMessageLoad.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.changeMessaboxVisibility = this.changeMessaboxVisibility.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const loading = this.props.fetchAllUnreadMessages.loading;

        if (!loading && !this.props.fetchAllUnreadMessages.hasError && this.props.fetchAllUnreadMessages !== prevProps.fetchAllUnreadMessages) {
            this.setState({
                displayMessageCount: true,
            }, () => {
                this.getUnreadMessagesCount();
            })
        }

        const errorMessage = this.getErrorMessage(prevProps);
        const successMessage = this.getSuccessMessage(prevProps)

        if (errorMessage) {
            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (successMessage) {
            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    getSuccessMessage(prevProps) {
        if (!this.props.fetchAllUnreadMessages.hasError && this.props.fetchAllUnreadMessages.message && this.props.fetchAllUnreadMessages !== prevProps.fetchAllUnreadMessages) {
            return this.props.fetchAllLogs.message;
        }
        else if (!this.props.searchResultsData.hasError && this.props.searchResultsData.message && this.props.searchResultsData !== prevProps.searchResultsData) {
            return this.props.searchResultsData.message;
        }

        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.fetchAllUnreadMessages.hasError && prevProps.fetchAllUnreadMessages.error !== this.props.fetchAllUnreadMessages.error) {
            return this.props.fetchAllUnreadMessages.message || 'Server Error';
        }
        else if (this.props.searchResultsData.hasError && prevProps.searchResultsData.error !== this.props.searchResultsData.error) {
            return this.props.searchResultsData.message || 'Server Error';
        }

        return null;
    }

    searchFriend(event) {
        event.preventDefault();

        const loggedInUserId = this.props.loggedInUserData.id;
        const search = this.state.search;

        this.props.searchResult(loggedInUserId, search);
        return this.props.history.push({ pathname: "/home/users/search" });
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getAllFriendMessages = () => {
        if (this.state.showDropdown === 'show-dropdown') {
            this.changeMessaboxVisibility();
            return;
        }

        this.props.loadAllUnreadMessages();
        this.setState({ showDropdown: 'show-dropdown' })
    }

    triggerMessageLoad = (id, firstName, lastName, profilePicUrl, event) => {
        this.changeMessaboxVisibility();
        const userData = { id, firstName, lastName, profilePicUrl }
        this.props.triggerMessageLoad(userData);
    }

    handleBlur = () => (event) => {
        this.setState({
            showDropdown: '',
        });
    }

    changeMessaboxVisibility = () => {
        if (this.state.showDropdown === '') {
            this.setState({ showDropdown: 'show-dropdown' })
        } else {
            this.setState({ showDropdown: '' })
        }
    }

    getUnreadMessagesCount = () => {
        let count = this.props.allUnreadMessages.reduce((a, b) => {
            return a + b.count;
        }, 0)
      
        if (count > 0) {
            this.setState({
                unreadMessages: count,
                displayMessageCount: true,
            })
        } else {
            this.setState({
                unreadMessages: 0,
                displayMessageCount: false,

            })
        }
    }

    render() {
        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();
        const userId = userService.getUserId();
        

        const { loggedIn, onLogout } = this.props;
        const showDropdown = this.state.showDropdown;

        let pathname = this.props.location.pathname !== "/";

        const isFrendRequestsArrEmpty = this.props.friendRequestsArr.length > 0
        let messages = (
            <Fragment>
                <div className="dropdown-messagebox-header" onClick={this.changeHeight}>
                    <h5 className="dropdown-chat-title" style={{ color: ' #333' }}>
                        Không có tin nhắn mới!
                    </h5>
                </div>
            </Fragment>
        )

        if (this.props.allUnreadMessages.length > 0) {
            messages = (
                <Fragment>
                    <div className="messagebox-navbar-container">
                        {this.props.allUnreadMessages.map(message =>
                            <MessageNavBarRow
                                key={message.id}
                                {...message}
                                triggerMessageLoad={this.triggerMessageLoad}
                                className="dropdown-item"
                            />
                        )}
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment >
                <input type="checkbox" name="main-nav-toggle" id="main-nav-toggle" />
                <header className="site-header navbar">
                    <section className="navbar-section">
                        <div className="navbar-wrapper">
                            <div className="nav-searchbar-container">
                                <div>
                                    <img className="main-logo" alt="" src={Logo} />
                                </div>
                                <div className="flex site-logo">
                                    <NavLink exact to={`/dasbroad/${userId}`} className="nav-link"><p>InstaFace</p></NavLink>
                                </div>
                                {loggedIn && <form className="form-inline my-2 my-lg-0" onSubmit={this.searchFriend}>
                                    <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Tìm kiếm bạn bè"
                                        aria-label="Search"
                                        name="search"
                                        id="search"
                                        value={this.state.search}
                                        onChange={this.onChangeHandler}
                                    />

                                    <button className="btn button-navbar-outline my-2 my-sm-0" type="submit">
                                        <img className="imgSearch" src={iconSearch}></img> Tìm kiếm</button>
                                </form>}
                            </div>

                            <label id="toggle" htmlFor="main-nav-toggle" style={{ 'marginBottom': '0' }}><span>Menu</span></label>

                            <nav className="nav-main">
                                <ul className="nav-ul">
                                    {/* {loggedIn && <li className="nav-item"><NavLink exact to={`/home/profile/${userId}`} className="nav-link  fas fa-user tooltipCustom"  > {userService.getUsername()}<span className="tooltiptextCustom">Trang cá nhân</span></NavLink></li>}

                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/comments/${userId}`} className="nav-link ">Trang chủ</NavLink></li>} */}
                                    
                                    {loggedIn && <ul class='nav'>
                                        <li class='active'></li>
                                        <li>
                                            <div class="dropdown">
                                                <a class="dropdown-toggle" data-toggle="dropdown" href="#"> <img className ="iconFriend" src={iconFriend}></img> Bạn bè </a>
                                               
                                            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">            
                                                <li className="nav-item"><NavLink exact to={`/home/findFriends/${userId}`} className="nav-link " >Tìm kiếm bạn bè</NavLink></li>
                                                <li className="nav-item"><NavLink exact to={`/home/friendRequests/${userId}`} className="nav-link " >
                                                {isFrendRequestsArrEmpty && <span id="icon-badge-container-friend-requests">{this.props.friendRequestsArr.length}</span>}Lời mời kết bạn</NavLink></li>
                                                <li className="nav-item"><NavLink exact to={`/home/friends/${userId}`} className="nav-link " >Danh sách bạn bè </NavLink></li>
                                            </ul>
                                            </div>   
                                        </li>
                                    </ul>}

                                    {loggedIn &&
                                        <li className="nav-item"
                                            id="onclick-wrapper"
                                            onClick={this.getAllFriendMessages}
                                            onBlur={this.handleBlur('onclick-wrapper')}
                                        >
                                            <div className="icon-badge-wrapper">
                                                <NavLink className="tooltipCustom nav-link" to="#">
                                                    <img className="imgMess" src={iconMess}></img> Tin nhắn
                                                </NavLink>
                                                {this.state.displayMessageCount && <span id="icon-badge-container-messages">{this.state.unreadMessages}</span>}
                                            </div>

                                            <div className={`dropdown-container ${showDropdown}`}>
                                                <div className="dropdown-messagebox-header" onClick={this.changeHeight}>
                                                    <div className="dropdown-messagebox-chat-icon">
                                                        <i className="fas fa-envelope"></i>
                                                    </div>
                                                    <h4 className="dropdown-chat-title" style={{ color: ' #333' }}>
                                                        Tin nhắn
                                                    </h4>
                                                </div>
                                                {messages}
                                            </div>
                                        </li>
                                    }
                                    {loggedIn && <ul class='nav'>
                                        <li class='active'></li>
                                        <li>
                                            <div class="dropdown">
                                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">  <img className = "imgProfile" src={this.props.userId} alt="" /> {userService.getFirstName()}</a>
                                            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">            
                                                <li className="nav-item"><NavLink exact to={`/home/profile/${userId}`} className="nav-link " >Trang cá nhân</NavLink></li>
                                                <li className="nav-item"><NavLink exact to={`/setting/account/${userId}`} className="nav-link " >Cài đặt</NavLink></li>
                                                <li className="nav-item"><NavLink exact to="#" className="nav-link " onClick={onLogout} >Đăng xuất</NavLink></li>
                                            </ul>
                                            </div>   
                                        </li>
                                    </ul>}

                                    {(loggedIn && (isRoot || isAdmin)) && <li className="nav-item"><NavLink exact to={`/home/logs/${userId}`} className="nav-link">Nhật ký</NavLink></li>}
                                    {!loggedIn && <li className="nav-item"><NavLink exact to="/login" className="nav-link" >Đăng nhập</NavLink></li>}
                                    {!loggedIn && <li className="nav-item"><NavLink exact to="/register" className="nav-link" >Đăng ký</NavLink></li>}
                                </ul>
                            </nav>
                        </div>
                    </section>
                </header>
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timeLineUserData: state.timeLineUserData,
        loggedInUserData: state.loggedInUserData,

        fetchAllUnreadMessages: state.fetchAllUnreadMessages,
        allUnreadMessages: state.fetchAllUnreadMessages.allUnreadMessages,

        searchResultsData: state.searchResults,

        friendRequestsArr: state.findFriends.userWaitingForAcceptingRequest,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        triggerMessageLoad: (userData) => { dispatch(triggerMessageLoadAction(userData)) },
        searchResult: (loggedInUserId, search) => { dispatch(searchResultsAction(loggedInUserId, search)) },
        loadAllUnreadMessages: () => { dispatch(fetchAllUnreadMessagesAction()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


