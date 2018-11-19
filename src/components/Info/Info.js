import React from 'react';

const info = (props) => {
     
    let balances = props.user.balances.map(res => (
        <li key={res.symbol}>{res.symbol}: {Number.parseFloat(res.balance).toFixed(2)}</li>
    ));

    let information = <h1>Please set your name first</h1>;
    if (props.isNameSet) {
        information = (
            <div>
                <h1>Welcome {props.user.name}!</h1>
                {balances}
            </div>
        );
    }

    return (
        <div>
            {information}
        </div>
    )
}

export default info;
