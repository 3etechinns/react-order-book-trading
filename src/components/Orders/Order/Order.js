import React from 'react';
import classes from './Order.css';
const order = (props) => {
    const priceClass = [classes.Price];
    if(props.type === "ask") {
        priceClass.push(classes.Ask)
    } else {
        priceClass.push(classes.Bid)
    }

    return (
        <tr className={classes.Order}>
            <td className={priceClass.join(' ')}>{Number.parseFloat(props.price).toFixed(4)}</td>
            <td className={classes.Volume}>{Number.parseFloat(props.closed ? props.originalVolume : props.volume).toFixed(4)}</td>
            <td className={classes.Type}>{props.type}</td>            
        </tr>
    )
}

export default order;