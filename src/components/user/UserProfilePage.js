import React, { Component, Fragment } from 'react';
import { userService } from '../../infrastructure';
import { Button, ButtonWithClickEvent } from '../common';
import './css/UserProfilePage.css';

import { connect } from 'react-redux';
import { changeCurrentTimeLineUserAction, changeAllFriendsAction } from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class UserProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTimeLineUserId: '',
            ready: false
        }
    }

    componentDidMount() {
        const currentTimeLineUserId = this.props.match.params.id
        this.setState({ currentTimeLineUserId });

        if (currentTimeLineUserId !== this.props.timeLineUser.id) {
            this.initialDataLoad(currentTimeLineUserId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentTimeLineUserId !== this.props.match.params.id) {
            this.initialDataLoad(this.props.match.params.id);
        }
    }

    initialDataLoad = (currentTimeLineUserId) => {
        this.setState({ currentTimeLineUserId },
            () => {
                this.props.changeTimeLineUser(currentTimeLineUserId);
                this.props.changeAllPictures(currentTimeLineUserId);
                this.props.changeAllFriends(currentTimeLineUserId);
            }
        )
    }

    onSubmitHandlerDelete = (e) => {
        this.props.history.push({
            pathname: "/home/users/delete/" + this.props.timeLineUser.id,
        });
    }

    onSubmitHandlerEdit = (e) => {
        this.props.history.push({
            pathname: "/home/users/edit/" + this.props.timeLineUser.id,
            state:
                { ...this.props.timeLineUser }
        });
    }

    render = () => {
        let timeLineUserRole;
        if (this.props.timeLineUser.authorities) {
            timeLineUserRole = this.props.timeLineUser.authorities[0]['authority'];
        }

        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();
        const isCurrentUserRoot = timeLineUserRole === 'ROOT';

        return (
            <Fragment className="container1">
                <article className="container1 main-article-shared-content">
                    <section className="profile-content-section">
                        <div className="container mx-auto text-center mb-1" >
                            <h3 className="text-center font-weight-bold mt-6 tille" style={{ 'margin': '1rem auto' }}>Thông tin cá nhân</h3>

                            <div className="col-md-10 mx-auto text-center">
                                <table className="table table-hover mt-3 mx-auto text-center">
                                    
                                    <tbody>
                                        <tr className="row">
                                            {/* <td className="col-md-6">
                                                <h5 className=" font-weight-bold">Tên đăng nhập: </h5>
                                            </td>
                                            <td className="col-md-6 username-color" >
                                                <h5>{this.props.timeLineUser.username}</h5>
                                            </td> */}
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className="font-weight-normal text-start">Email</h5>
                                            </td>
                                            <td className="col-md-6">
                                                <h5 className="font-weight-normal text-start">{userService.formatUsername(this.props.timeLineUser.email)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className="font-weight-normal text-start">Họ và tên</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5 className="font-weight-normal text-start">{userService.formatUsername(this.props.timeLineUser.firstName + " " + this.props.timeLineUser.lastName)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className="font-weight-normal text-start">Ngày sinh</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5 className="font-weight-normal text-start">{userService.formatUsername(this.props.timeLineUser.birthDay)}</h5>
                                            </td>
                                        </tr>
                                        {/* <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">Last Name</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5>{userService.formatUsername(this.props.timeLineUser.lastName)}</h5>
                                            </td>
                                        </tr> */}
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className="font-weight-normal text-start">Giới tính</h5>
                                            </td>
                                            <td className="col-md-6">
                                                <h5 className="font-weight-normal text-start">{userService.formatUsername(this.props.timeLineUser.gender)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className="font-weight-normal text-start">Địa chỉ</h5>
                                            </td>
                                            <td className="col-md-6">
                                                <h5 className="font-weight-normal text-start">{userService.formatUsername(this.props.timeLineUser.address)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className="font-weight-normal text-start">Quê quán</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5 className="font-weight-normal text-start">{userService.formatUsername(this.props.timeLineUser.city)}</h5>
                                            </td>
                                        </tr>
                                        {(isAdmin || isRoot) && <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">Role</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5>{timeLineUserRole}</h5>
                                            </td>
                                        </tr>}

                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-center ">
                                    {(((isRoot || isAdmin) && !isCurrentUserRoot) || userService.isLoggedInUser(this.props.timeLineUser.username)) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/edit/`} text={"Chỉnh sửa"} onClick={this.onSubmitHandlerEdit} />}
                                    {((isRoot) && !userService.isLoggedInUser(this.props.timeLineUser.username)) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/delete/`} text={"Delete"} onClick={this.onSubmitHandlerDelete} />}
                                    {(isAdmin || isRoot) && <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/all/${this.props.loggedInUser.id}`} text={"All Users"} />}

                                </div >
                            </div >
                        </div >
                    </section>
                </article>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUserData,
        timeLineUser: state.timeLineUserData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => {dispatch(changeAllFriendsAction(userId))},
        changeAllPictures: (userId) => {dispatch(changeAllPicturesAction(userId))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);