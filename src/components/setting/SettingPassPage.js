import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import '../setting/css/SettingAccountPage.css';

import { connect } from 'react-redux';
import { updateUserAction, changeCurrentTimeLineUserAction, changeAllFriendsAction } from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class SettingPassPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            touched: {
                username: false,
                email: false,
                password: false,
                confirmPassword: false,
            }
        };

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
                firstName: this.props.timeLineUserData.firstName,
                lastName: this.props.timeLineUserData.lastName,
                birthDay: this.props.timeLineUserData.birthDay,
                gender: this.props.timeLineUserData.gender,
                info: this.props.timeLineUserData.info,
                address: this.props.timeLineUserData.address,
                city: this.props.timeLineUserData.city,
                profilePicUrl: this.props.timeLineUserData.profilePicUrl,
                backgroundImageUrl: this.props.timeLineUserData.backgroundImageUrl,
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
                firstName: this.props.timeLineUserData.firstName,
                lastName: this.props.timeLineUserData.lastName,
                birthDay: this.props.timeLineUserData.birthDay,
                gender: this.props.timeLineUserData.gender,
                info: this.props.timeLineUserData.info,
                address: this.props.timeLineUserData.address,
                city: this.props.timeLineUserData.city,
                profilePicUrl: this.props.timeLineUserData.profilePicUrl,
                backgroundImageUrl: this.props.timeLineUserData.backgroundImageUrl
            })
        } else if (successMessage) {
            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
            this.props.history.push(`/setting/profile/${this.state.id}`);
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
        const { username, email, password, confirmPassword } = this.state;
        const errors = this.validate(username, email, password, confirmPassword);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate = (username, email, password, confirmPassword) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const testEmail = emailRegex.test(email)
        return {
            username: username.length < 4 || username.length > 16,
            email: email.length === 0 || !testEmail,
            password: password.length < 4 || password.length > 16,
            confirmPassword: confirmPassword.length === 0 || confirmPassword !== password,
        }
    }

    render() {
        const { username, email, password, confirmPassword} = this.state;
        const errors = this.validate(username, email, password, confirmPassword);
        const isEnabled = !Object.keys(errors).some(x => errors[x])

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        }

        
        
        return (
            <Fragment>
                <article className="setting-account-main">
                    <section className="setting-form">
                        <div className="container mb-3">
                            <h3 className="text-start font-weight-bold mt-3" style={{ 'margin': '1rem auto' }}>Mật khẩu và bảo mật</h3>
                            <h4 className="text-start font-weight-normal mt-3" style={{ 'margin': '1rem auto' }}>Thay đổi mật khẩu</h4>

                            <form class="row g-3" onSubmit={this.onSubmitHandler}>
                            <div className=" col-md-12 form-group">
                                        <label htmlFor="password" ></label>
                                        <input
                                            type="password"
                                            className={"form-control " + (shouldMarkError('password') ? "error" : "")}
                                            id="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('password')}
                                            aria-describedby="passwordHelp"
                                            placeholder="Nhập mật khẩu"
                                        />
                                        {shouldMarkError('password') && <small id="passwordHelp" className="form-text alert alert-danger">{(!this.state.password ? 'Mật khẩu không được để trống!' : 'Mật khẩu phải từ 4 ký tự đến 16 ký tự!')}</small>}
                                    </div>
                                <div className="col-md-12 form-group">
                                        <label htmlFor="confirmPassword" ></label>
                                        <input
                                            type="password"
                                            className={"form-control " + (shouldMarkError('confirmPassword') ? "error" : "")}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('confirmPassword')}
                                            aria-describedby="confirmPasswordHelp"
                                            placeholder="Xác nhận mật khẩu"
                                        />
                                        {shouldMarkError('confirmPassword') && <small id="confirmPasswordHelp" className="form-text alert alert-danger">Mật khẩu không giống!</small>}
                                    </div>
                                <div className="col-12 text-center">
                                    <button type="submit" className="btn App-button-primary btn-lg m-3">Lưu thay đổi</button>
                                    <NavLink className="btn App-button-primary btn-lg m-3" to={`/setting/profile/${this.props.id}`} role="button">Hủy</NavLink>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingPassPage);

