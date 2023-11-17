import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import '../setting/css/SettingAccountPage.css';

import { connect } from 'react-redux';
import { updateUserAction, changeCurrentTimeLineUserAction, changeAllFriendsAction } from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class SettingAccountPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.timeLineUserData.id,
            username: this.props.timeLineUserData.username,
            email: this.props.timeLineUserData.email,
            touched: {
                username: false,
                email: false,
            }
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount = () => {
        const currentTimeLineUserId = this.props.match.params.id
        if (currentTimeLineUserId !== this.props.timeLineUserData.id) {
            this.props.changeTimeLineUser(currentTimeLineUserId);
            this.props.changeAllPictures(currentTimeLineUserId);
            this.props.changeAllFriends(currentTimeLineUserId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const loading = this.props.changeTimeLineUserData.loading ||
            this.props.changeAllFriends.loading || this.props.changePicture.loading;

        if (!loading && this.props.timeLineUserData.id !== this.state.id) {
            this.setState({
                id: this.props.timeLineUserData.id,
                username: this.props.timeLineUserData.username,
                email: this.props.timeLineUserData.email,
            })
        }

        const errorMessage = this.getErrorMessage(prevProps);
        const successMessage = this.getSuccessMessage(prevProps)

        if (errorMessage) {
            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            this.setState({
                id: this.props.timeLineUserData.id,
                username: this.props.timeLineUserData.username,
                email: this.props.timeLineUserData.email,
            })
        } else if (successMessage) {
            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
            this.props.history.push(`/home/profile/${this.state.id}`);
        }
    }

    getSuccessMessage(prevProps) {
        if (!this.props.updateUserData.hasError && this.props.updateUserData.message && this.props.updateUserData !== prevProps.updateUserData) {
            return this.props.updateUserData.message;
        }
        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.updateUserData.hasError && prevProps.updateUserData.error !== this.props.updateUserData.error) {
            return this.props.updateUserData.message || 'Server Error';
        }
        return null;
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            return;
        }

        const { touched, ...otherProps } = this.state;
        const loggedInUserId = this.props.loggedInUserData.id;
        this.props.updateUser(loggedInUserId, otherProps);
    }

    canBeSubmitted() {
        const { username, email } = this.state;
        const errors = this.validate(username, email);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    render() {

        return (
            <Fragment>
                <article className="setting-account-main">
                    <section className="setting-form">
                        <div className="container mb-3">
                            <h3 className="text-start font-weight-bold mt-3" style={{ 'margin': '1rem auto' }}>Tổng quan tài khoản</h3>

                            <form class="row g-3" onSubmit={this.onSubmitHandler} >
                                <div class="col-md-12">
                                    <label htmlFor="username" className="font-weight-bold" >Tên tài khoản</label>
                                        <input
                                            type="text"
                                            className={"form-control "}
                                            id="username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('username')}
                                            aria-describedby="usernameHelp"
                                            placeholder="Tên người dùng"
                                            disabled
                                        />
                                </div>
                                <div class="col-md-12">
                                    <label htmlFor="email" className="font-weight-bold" >Địa chỉ email</label>
                                        <input
                                            type="text"
                                            className={"form-control "}
                                            id="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('email')}
                                            aria-describedby="emailHelp"
                                            placeholder="Địa chỉ email"
                                            disabled
                                        />
                                </div>
                            </form>
                        </div>
                    </section>
                </article>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timeLineUserData: state.timeLineUserData,
        loggedInUserData: state.loggedInUserData,
        updateUserData: state.updateUserData,
        changeTimeLineUserData: state.changeTimeLineUserData,
        changePicture: state.changePicture,
        changeAllFriends: state.changeAllFriends
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (loggedInUserId, userData) => { dispatch(updateUserAction(loggedInUserId, userData)) },
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => { dispatch(changeAllFriendsAction(userId)) },
        changeAllPictures: (userId) => { dispatch(changeAllPicturesAction(userId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingAccountPage);

