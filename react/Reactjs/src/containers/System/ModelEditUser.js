import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
import { editUserService } from '../../services/userService'; // (Đường dẫn tùy thuộc vào vị trí thực tế của file so với thư mục services)
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            });
        }
        console.log('check props from parent edit', this.props.currentUser); // <--- Đặt ở đây
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnchangeInput = (event, id) => {
        // this.setState({

        // good code
        let copystate = { ...this.state };
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        }, () => {
        });
    }
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            // call api create modal
            this.props.editUser(this.state);
        }
    }


    render() {

        return (

            <Modal
                isOpen={true}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
            // centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container '>
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => {
                                    this.handleOnchangeInput(event, 'email')
                                }}
                                value={this.state.email}
                                disabled
                            />

                        </div>
                        <div className='input-container '>
                            <label>Password</label>
                            <input
                                type="Password"
                                onChange={(event) => { this.handleOnchangeInput(event, 'password') }}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className='input-container '>
                            <label>firstName</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }} value={this.state.firstName} />
                        </div>
                        <div className='input-container '>
                            <label>LastName</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }} value={this.state.lastName} />
                        </div>
                        <div className='input-container max-width-input '>
                            <label>Address</label>
                            <input type="text" onChange={(event) => { this.handleOnchangeInput(event, 'address') }} value={this.state.address} />
                        </div>

                    </div>


                </ModalBody>
                {/* Sử dụng ModalFooter và Button của reactstrap đã import */}
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handleSaveUser() }}
                    >Save changes</Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


