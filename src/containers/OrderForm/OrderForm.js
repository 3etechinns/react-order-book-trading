import React, { Component } from 'react';
import classes from './OrderForm.css';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as actionTypes from '../../store/actions/index';

class OrderForm extends Component {

    state = {
        orderForm: {
            type: {
                type: 'select',
                config: {
                    options: [
                        {
                            value: 'bid',
                            displayValue: 'Buy (Bid)'
                        },
                        {
                            value: 'ask',
                            displayValue: 'Sell (Ask)'
                        },
                    ]
                },
                value: 'bid',
                validation: {
                    required: true
                },
                valid: true
            },
            price: {
                type: 'input',
                config: {
                    type: 'number',
                    placeholder: 'Price',
                    min:'0',
                    step:'any'
                },
                value: '',
                validation: {
                    required: true,
                    isNumber: true,
                    minNumber: 0
                },
                valid: false,
                touched: false
            },
            volume: {
                type: 'input',
                config: {
                    type: 'number',
                    placeholder: 'Volume',
                    min:'0',
                    step:'any'
                },
                value: '',
                validation: {
                    required: true,
                    isNumber: true,
                    minNumber: 0
                },
                valid: false,
                touched: false
            },
            total: {
                type: 'input',
                config: {
                    type: 'number',
                    placeholder: 'Total',
                    min:'0',
                    step:'any'
                },
                value: '',
                validation: {
                    required: true,
                    isNumber: true,
                    minNumber: 0
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        errorMessage: null
    }

    inputChangeHandler = (event, elementID) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        }
        
        updatedOrderForm[elementID].value = event.target.value;
        updatedOrderForm[elementID].touched = true;

        if(elementID === "price" && updatedOrderForm['volume'].value > 0 || elementID === "volume" && updatedOrderForm['price'].value > 0) {
            updatedOrderForm['total'].value = updatedOrderForm['volume'].value * updatedOrderForm['price'].value;
        } else if(elementID === "total" && updatedOrderForm['price'].value > 0) {
            updatedOrderForm['volume'].value = updatedOrderForm['total'].value / updatedOrderForm['price'].value;
        }

        updatedOrderForm['volume'].valid = this.checkValidity(updatedOrderForm['volume'].value, updatedOrderForm['volume'].validation);
        updatedOrderForm['total'].valid = this.checkValidity(updatedOrderForm['total'].value, updatedOrderForm['total'].validation);
        updatedOrderForm['price'].valid = this.checkValidity(updatedOrderForm['price'].value, updatedOrderForm['price'].validation);

        let formIsValid = true;
        for (let elementID in updatedOrderForm) {
            formIsValid = updatedOrderForm[elementID].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid, errorMessage: null})
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = isValid && value.toString().trim() !== '';
        }

        if (rules.isNumber) {
            const re = /^-{0,1}\d*\.{0,1}\d+$/;
            isValid = isValid && re.test(String(value).toLowerCase());
        }

        if (rules.minNumber || rules.minNumber === 0) {
            isValid = isValid && value >= rules.minNumber + 0.0001
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            if(this.state.orderForm[formElementIdentifier].value<=0) {
                this.setState({errorMessage: "ERROR: Total is below 0."})
                return
            }

            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ...formData
        }

        if(order.type === 'bid' && order.total > this.props.balanceFiat ) {
            this.setState({errorMessage: `ERROR: You only have ${this.props.balance[0].symbol} ${this.props.balance[0].price}.`})
            return
        } else if(order.type ==='ask' && order.volume > this.props.balanceCrypto) {
            this.setState({errorMessage: `ERROR: You only have ${this.props.balance[1].symbol} ${this.props.balance[1].symbol}.`})
            return
        }

        // If it reaches here, I can edit value for the balance.
        this.props.updateBalance(order);
        this.props.executeOrder(order);
    }

    render () {
        
        const arr = [];
        for(let key in this.state.orderForm){
            arr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = arr.map(el => (
            <Input 
                key={el.id}
                noMessage={true}
                elementType={el.config.type}
                elementConfig={el.config.config}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(event) => this.inputChangeHandler(event, el.id)}
            />
        ))
        ;

        return (
            <div className={classes.OrderForm}>
                <div className={classes.PlaceOrder}>Place Limit Order</div>
                <form onSubmit={this.orderHandler}>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                    {this.state.errorMessage}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.order,
        user: state.user.name,
        balance: state.user.balances
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBalance: (balance) => dispatch(actionTypes.updateBalance(balance)),
        addOrder: (order, user) => dispatch(actionTypes.addOrder(order, user)),
        executeOrder: (order) => dispatch(actionTypes.executeOrder(order)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);