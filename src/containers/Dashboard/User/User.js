import React, { Component } from 'react';
import classes from './User.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import ProfilePicture from '../../../assets/images/profile.png';
import Info from '../../../components/Info/Info';

class User extends Component{
    render () {
        return (
            <div className={classes.User}>
                <div className={classes.Picture}>
                    <img src={ProfilePicture} alt="Profile Picture" />
                </div>
                <Info user={this.props.user} isNameSet={this.props.isNameSet}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userInit: () => dispatch(actions.userInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
