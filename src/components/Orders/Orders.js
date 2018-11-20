import React, { Component } from 'react';
import Order from './Order/Order';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const Orders = (props) => {

    const orders = props.list.map(el => {
        return(
        <Order 
            key={el.id}
            type={props.type}
            {...el}
        />
    ) });

    return (
        <Aux>
            {orders}
        </Aux>
    )
}

export default Orders;