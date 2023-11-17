import React, { Component, Fragment, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import { userService } from '../../infrastructure/';
import { css } from '@emotion/core';

import TimeLine from './TimeLine';
import HeaderSection from './HeaderSection';
import Intro from './Intro';
import PhotoGallery from './PhotosGallery';
import FriendsGallery from './FriendsGallery';

import { connect } from 'react-redux';
import { fetchPicturesAction } from '../../store/actions/pictureActions';
import { fetchAllUnreadMessagesAction } from '../../store/actions/messageActions';
import { fetchLoggedInUserAction, fetchTimeLineUserAction, fetchAllFriendsAction, findFriendsAction } from '../../store/actions/userActions';

import './css/SettingMain.css';
const SettingSearchResultsPage = lazy(() => import('../user/UserSearchResultsPage'));
const SettingProfilePage = lazy(() => import('../setting/SettingProfilePage'));
const SettingAccountPage = lazy(() => import('../../components/setting/SettingAccountPage'));
const SettingPassPage = lazy(() => import('../../components/setting/SettingPassPage'));
const SettingDeletePage = lazy(() => import('../../components/user/UserDeletePage'));
const SettingLogsPage = lazy(() => import('../user/UserLogsPage'));
const MessageBox = lazy(() => import('./MessageBox'));
const ErrorPage = lazy(() => import('../common/ErrorPage'));

const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
`;

class SettingMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ready: false
        }

        this.loadAllPictures = this.loadAllPictures.bind(this);
        this.loadAllFriends = this.loadAllFriends.bind(this);
    }

    componentDidMount() {
        const userId = userService.getUserId();
        const timeLineUserId = userService.getUserId();

        this.props.loadLoggedInUserData(userId);
        this.loadAllPictures(timeLineUserId);
        this.loadAllFriends(timeLineUserId);
        this.props.findFriends(userId);
        this.props.loadAllUnreadMessages();

        this.setState({ ready: true });
    }

    componentDidUpdate(prevProps, prevState) {
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
        if (!this.props.fetchPictures.hasError && this.props.fetchPictures.message && this.props.fetchPictures !== prevProps.fetchPictures) {
            return this.props.fetchPictures.message;
        }
        else if (!this.props.loggedInUserData.hasError && this.props.loggedInUserData.message && this.props.loggedInUserData !== prevProps.loggedInUserData) {
            return this.props.loggedInUserData.message;
        }
        else if (!this.props.fetchAllFriends.hasError && this.props.fetchAllFriends.message && this.props.fetchAllFriends !== prevProps.fetchAllFriends) {
            return this.props.fetchAllFriends.message;
        }
        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.fetchPictures.hasError && prevProps.fetchPictures.error !== this.props.fetchPictures.error) {
            return this.props.fetchPictures.message || 'Server Error';
        }
        else if (this.props.loggedInUserData.hasError && prevProps.loggedInUserData.error !== this.props.loggedInUserData.error) {
            return this.props.loggedInUserData.message || 'Server Error';
        }
        else if (this.props.fetchAllFriends.hasError && prevProps.fetchAllFriends.error !== this.props.fetchAllFriends.error) {
            return this.props.fetchAllFriends.message || 'Server Error';
        }

        return null;
    }

    loadAllPictures = (userId) => {
        this.props.loadAllPictures(userId);
    }

    loadAllFriends = (userId) => {
        this.props.loadAllFriends(userId);
    }

    render() {
        const isRoot = userService.isRoot();
        const isAdmin = userService.isAdmin();
        const isTheCurrentLoggedInUser = this.props.loggedInUserData.id === this.props.timeLineUserData.id;
        let loggedIn = userService.isTheUserLoggedIn();
        debugger;
        return (
            <Fragment>
                <main className="site-content">
                    <section className="main-section">
                        <Suspense fallback={
                            <div className='sweet-loading'>
                                Đang tải...
                            </div>}>
                            <Switch>
                                {loggedIn && <Route exact path="/setting/profile/:id" component={SettingProfilePage} />}
                                {loggedIn && (isRoot || isAdmin || isTheCurrentLoggedInUser) && <Route exact path="/setting/account/:id" component={SettingAccountPage} />}
                                {loggedIn && (isRoot || isAdmin || isTheCurrentLoggedInUser) && <Route exact path="/setting/pass/:id" component={SettingPassPage} />}
                                {(loggedIn && isRoot) && <Route exact path="/home/users/delete/:id" component={SettingDeletePage} />}
                                {(loggedIn && (isRoot || isAdmin)) && <Route exact path="/home/logs/:id" component={SettingLogsPage} />}
                                {loggedIn && <Route exact path="/home/users/search/" component={SettingSearchResultsPage} />}

                                <Route exact path="/error" component={ErrorPage} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </Suspense>
                    </section>
                    <Fragment>
                        <section className="aside-section">
                            <MessageBox />
                        </section>
                    </Fragment>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        picturesArr: state.fetchPictures.picturesArr,
        fetchPictures: state.fetchPictures,
        timeLineUserData: state.timeLineUserData,
        loggedInUserData: state.loggedInUserData,
        friendsArr: state.fetchAllFriends.friendsArr,
        fetchAllFriends: state.fetchAllFriends,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllPictures: (userId) => { dispatch(fetchPicturesAction(userId)) },
        loadLoggedInUserData: (userId) => { dispatch(fetchLoggedInUserAction(userId)) },
        loadTimelineUserData: (userId) => { dispatch(fetchTimeLineUserAction(userId)) },
        loadAllFriends: (userId) => { dispatch(fetchAllFriendsAction(userId)) },
        findFriends: (userId) => { dispatch(findFriendsAction(userId)) },
        loadAllUnreadMessages: () => { dispatch(fetchAllUnreadMessagesAction()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingMain);