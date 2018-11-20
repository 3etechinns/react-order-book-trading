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
                    placeholder: 'Price'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            volume: {
                type: 'input',
                config: {
                    type: 'number',
                    placeholder: 'Volume'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            total: {
                type: 'input',
                config: {
                    type: 'number',
                    placeholder: 'Total'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    inputChangeHandler = (event, elementID) => {
        let connectedElementID = null;
        if(elementID === "total") {
            connectedElementID = "volume";
        } else if (elementID === "volume") {
            connectedElementID = "total";
        }
        

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedOrderElement = {
            ...updatedOrderForm[elementID]
        }
        
        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
        updatedOrderElement.touched = true;
        updatedOrderForm[elementID] = updatedOrderElement;

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
            isValid = isValid && value.trim() !== '';
        }
        
        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength
        }
        
        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength
        }

        return isValid;
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
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order,
        symbol: state.user.balances[0].symbol
    }
}

export default connect(mapStateToProps, null)(OrderForm);