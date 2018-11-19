import React, { Component } from 'react';
import classes from './App.css';

class App extends Component {

    render() {
        console.log(classes)
        return (
            <div className={classes.App}>
                <h1 className={classes.Title}>Hello World</h1>
            </div>
        )
    }
}

export default App; 