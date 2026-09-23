import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            userEdit: {},
        };
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // Reset state khi nhận được sự kiện
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            });
        });
    }
    componentDidMount() {
        this.listenToEmitter();
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
            console.log('check good state', this.state);
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
    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            // call api create modal
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
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
                                autoComplete="off"

                            />

                        </div>
                        <div className='input-container '>
                            <label>Password</label>
                            <input
                                type="Password"
                                onChange={(event) => { this.handleOnchangeInput(event, 'password') }}
                                value={this.state.password}
                                autoComplete="new-password"
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
                        onClick={() => { this.handleAddNewUser() }}
                    >Add new</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


