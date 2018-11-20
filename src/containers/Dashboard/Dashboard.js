import React, { Component } from 'react';

import classes from './Dashboard.css';
import NameHandle from '../../components/NameHandle/NameHandle';
import Modal from '../../components/UI/Modal/Modal';
import User from './User/User';
import OrderBook from '../OrderBook/OrderBook';
import OrderForm from '../OrderForm/OrderForm';
import YourOrder from '../YourOrder/YourOrder';

class Dashboard extends Component{
    state = {
        createName: true
    }

    closeModal = () => {
        this.setState({ createName: false });
    }

    render () {
        return (
            <div className={classes.Dashboard}>
                <Modal show={this.state.createName}>
                    <NameHandle closeModal={this.closeModal}/>
                </Modal>
                
                <User isNameSet={!this.state.createName} />
                <div className={classes.Main}>
                    <OrderBook />
                    <div className={classes.Row}>
                        <OrderForm />
                        <YourOrder />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
