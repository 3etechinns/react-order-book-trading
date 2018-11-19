import React, { Component } from 'react';
import classes from './App.css';

import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {

    render() {
        return (
            <div className={classes.App}>
                <Dashboard />
            </div>
        )
    }
}

export default App; 