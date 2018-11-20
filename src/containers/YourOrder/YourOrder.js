import React, { Component } from 'react';
import classes from './YourOrder.css';
import { connect } from 'react-redux';
import Orders from '../../components/Orders/Orders';
import Spread from '../../components/Orders/Spread/Spread';
class YourOrder extends Component {

    state = {
        title: [
            "Price",
            "Volume",
            "Type",
        ],
        state: 'open'
    }

    closedHandler = () => {
        this.setState({state: 'closed'});
    }
    
    openHandler = () => {
        this.setState({state: 'open'});
    }
    
    render () {
        const order = [];
        let heading = null;
        if(this.props.hasOrdered) {
            for(let key in this.props.orders){
                const theState = this.state.state === 'open' ? !this.props.orders[key].closed : this.props.orders[key].closed;
                if(this.props.orders[key].user === this.props.user  && theState){
                    order.push({
                        ...this.props.orders[key]
                    })
                }
            }
        
            order.sort(function(a, b) {
                return b.id.localeCompare(a.id, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });
            });
            heading = this.state.title.map(name => (
                <th key={name}>{name}</th>
            ))
        }


        return (
            <div className={classes.YourOrder}>
                <div className={classes.Choose}>
                    <span className={this.state.state === 'open' ? classes.Selected: null} onClick={this.openHandler}>Open Orders</span>
                    <span className={this.state.state === 'closed' ? classes.Selected: null} onClick={this.closedHandler}>Closed Orders</span>
                </div>
                <table className={classes.OrderForm}>
                    <thead className={classes.Head}>
                        <tr>{heading}</tr>
                    </thead>
                    <tbody className={classes.Body}>
                        <Orders list={order}/>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.name,
        orders: state.order.order,
        symbol: state.user.balances[0].symbol,
        hasOrdered: state.order.hasOrdered
    }
}

export default connect(mapStateToProps, null)(YourOrder);