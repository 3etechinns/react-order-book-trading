import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';

class Main extends Component{
    state = {
        createName: true
    }

    render () {
        let inputName = <Input />
        return (
            <div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userInit: () => dispatch(actions.userInit()),   //Run once
        changeName: (name) => dispatch(actions.changeName(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
