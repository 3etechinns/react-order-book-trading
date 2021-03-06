import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

class NameHandle extends Component {
    state = {
        name: {
            value: "",
            touched: false,
            valid: false,
            validation: {
                required: true,
                isName: true
            },
            config: {
                placeholder: 'Full Name'
            }
        },
        formIsValid: false
    }

    inputChangeHandler = (event) => {
        const name = {
            ...this.state.name
        }

        name.value = event.target.value;
        name.valid = this.checkValidity(name.value, name.validation);
        name.touched = true;

        let formIsValid = true;
        formIsValid = name.valid && formIsValid;

        this.setState({name: name, formIsValid: formIsValid})
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = isValid && value.trim() !== '';
        }
        
        if (rules.isName) {
            const re = /^\s*([A-Za-z]{1,}([\.,] |[-']| )?)+[A-Za-z]+\.?\s*$/;
            isValid = isValid && re.test(String(value).toLowerCase());
        }

        return isValid;
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        const name = {
            name: this.state.name.value
        }
        
        this.props.changeName(name.name);
        this.props.closeModal();
    }

    render () {

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Identify yourself:</label>
                    <Input 
                        elementConfig={this.state.name.config}
                        value={this.state.name.value}
                        invalid={!this.state.name.valid}
                        shouldValidate={this.state.name.validation}
                        touched={this.state.name.touched}
                        changed={(event) => this.inputChangeHandler(event)}
                    />
                    
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
                </form>            
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeName: (name) => dispatch(actions.changeName(name)),
    }
}

export default connect(null, mapDispatchToProps)(NameHandle);
