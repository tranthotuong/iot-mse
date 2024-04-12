import React, { Component } from 'react';
import SmartClimate from './navigation/SmartClimate';

import { Provider } from "react-redux";
import { store } from "./store";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <SmartClimate />
            </Provider>
        )
    }
}