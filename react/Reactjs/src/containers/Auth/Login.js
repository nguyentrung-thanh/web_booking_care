import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';
import { divide } from 'lodash';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });

        try {
            let data = await handleLoginApi(this.state.email, this.state.password);
            let apiData = data.userData ? data.userData : data;

            if (apiData && apiData.errCode !== 0) {
                // Ưu tiên lấy thông báo từ server. Nếu server thực sự không gửi gì, dùng default text tiếng Anh.
                this.setState({
                    errMessage: apiData.message
                });
            }

            if (apiData && apiData.errCode === 0) {
                this.props.userLoginSuccess(apiData.user);
            }
        } catch (error) {

            // Xử lý trường hợp server trả về mã lỗi HTTP (400, 401...)
            if (error.response && error.response.data) {
                this.setState({
                    // Bắt nhiều trường hợp key dữ liệu từ backend
                    errMessage: error.response.data.message
                });
            } else {
                // Xử lý khi sập server hoặc mất mạng
                this.setState({
                    errMessage: 'Server is not responding. Please try again later!'
                });
            }
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className="login-backgorund">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="text-login">Login</div>
                        <div className="col-12 from-group login-input">
                            <label>Username & Email</label>
                            <input type="text"
                                className="form-control"
                                placeholder='Enter your email'
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)} />
                        </div>
                        <div className="col-12 from-group login-input">
                            <label>Password</label>
                            <div className='custom-input-pasword'>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className='btn-login' onClick={() => this.handleLogin()} >Log in</button>
                        </div>
                        <div className="col-12">
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className='text-other-login'>Or Login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fa-brands fa-google-plus-g google"></i>
                            <i className="fa-brands fa-facebook-f facebook "></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);