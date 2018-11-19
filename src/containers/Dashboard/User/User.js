import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import Info from '../../../components/Info/Info';

class User extends Component{
    render () {
        return (
            <div>
                <div></div>
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
