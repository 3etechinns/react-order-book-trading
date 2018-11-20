import React, { Component } from 'react';
import classes from './OrderForm.css';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class OrderForm extends Component {

    state = {
        orderForm: {
            type: {
                type: 'select',
                config: {
                    options: [
                        {
                            value: 'ask',
                            displayValue: 'Ask'
                        },
                        {
                            value: 'bid',
                            displayValue: 'Bid'
                        },
                    ]
                },
                value: 'ask',
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
                    min:'0'
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
                    min:'0'
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
                    min:'0'
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

        const updatedOrderElement = {
            ...updatedOrderForm[elementID]
        }
        
        updatedOrderElement.value = event.target.value;
        updatedOrderElement.touched = true;
        updatedOrderForm[elementID] = updatedOrderElement;

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

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
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
            const re = /^\d+$/;
            isValid = isValid && re.test(String(value).toLowerCase());
        }

        if (rules.minNumber || rules.minNumber === 0) {
            isValid = isValid && value > rules.minNumber
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

        if(order.total > this.props.balance) {
            this.setState({errorMessage: `ERROR: You only have ${this.props.symbol} ${this.props.balance}.`})
            return
        }
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
        orders: state.order,
        symbol: state.user.balances[0].symbol,
        balance: state.user.balances[0].balance
    }
}

export default connect(mapStateToProps, null)(OrderForm);