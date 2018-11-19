import React, { Component } from 'react';

import Handle from '../../components/Handle/Handle';
import Modal from '../../components/UI/Modal/Modal';
import User from './User/User';

class Dashboard extends Component{
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
                
                <User isNameSet={!this.state.createName} />
            </div>
        )
    }
}

export default Dashboard;
