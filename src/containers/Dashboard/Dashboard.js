import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Handle from '../../components/Handle/Handle';
import Modal from '../../components/UI/Modal/Modal';

class Main extends Component{
    state = {
        createName: true
    }

    closeModal = () => {
        this.setState({ createName: false });
    }

    render () {
        return (
            <div>
                <Modal show={this.state.createName}>
                    <Handle closeModal={this.closeModal}/>
                </Modal>
                
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userInit: () => dispatch(actions.userInit()),   //Run once
        changeName: (name) => dispatch(actions.changeName(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
