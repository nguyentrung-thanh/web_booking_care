import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModelUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModelEditUser';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
            // Thêm state lưu độ rộng mặc định của các cột
            colWidths: {
                email: 200,
                firstName: 150,
                lastName: 150,
                address: 250,
                action: 100
            }
        }
        // Các biến phụ để tính toán kéo thả
        this.startX = 0;
        this.startWidth = 0;
        this.currentCol = '';
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }

    handleAddNewUser = () => {
        this.setState({ isOpenModalUser: true });
    }

    toggleUserModal = () => {
        this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
    }

    toggleEditUserModal = () => {
        this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({ isOpenModalUser: false });
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': data.id });
            }
        } catch (e) {
            console.log("Lỗi catch:", e);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        });
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({ isOpenModalEditUser: false });
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage || "Có lỗi xảy ra từ server!");
            }
        } catch (e) {
            alert("Lỗi kết nối tới Server hoặc API bị lỗi! Hãy check console (F12).");
        }
    }

    // 3 hàm xử lý kéo thả chuột để đổi kích thước cột
    handleMouseDown = (e, colName) => {
        this.startX = e.clientX;
        this.startWidth = this.state.colWidths[colName];
        this.currentCol = colName;

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseMove = (e) => {
        if (!this.currentCol) return;
        const diff = e.clientX - this.startX;
        const newWidth = Math.max(50, this.startWidth + diff); // Không cho phép kéo nhỏ hơn 50px

        this.setState(prevState => ({
            colWidths: {
                ...prevState.colWidths,
                [this.currentCol]: newWidth
            }
        }));
    }

    handleMouseUp = () => {
        this.currentCol = '';
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
        let arrUsers = this.state.arrUsers;
        let { colWidths } = this.state; // Lấy độ rộng cột từ state

        return (
            <div className="user-container">
                {this.state.isOpenModalUser &&
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggleFromParent={this.toggleUserModal}
                        createNewUser={this.createNewUser}
                    />
                }

                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

                <div className="title text-center">
                    Manage users with gubo
                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={this.handleAddNewUser}>
                        <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th style={{ width: colWidths.email }}>
                                    Email
                                    <div className="resizer" onMouseDown={(e) => this.handleMouseDown(e, 'email')}></div>
                                </th>
                                <th style={{ width: colWidths.firstName }}>
                                    First name
                                    <div className="resizer" onMouseDown={(e) => this.handleMouseDown(e, 'firstName')}></div>
                                </th>
                                <th style={{ width: colWidths.lastName }}>
                                    Last name
                                    <div className="resizer" onMouseDown={(e) => this.handleMouseDown(e, 'lastName')}></div>
                                </th>
                                <th style={{ width: colWidths.address }}>
                                    Address
                                    <div className="resizer" onMouseDown={(e) => this.handleMouseDown(e, 'address')}></div>
                                </th>
                                <th style={{ width: colWidths.action }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                                                <i className="fas fa-trash"  ></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);