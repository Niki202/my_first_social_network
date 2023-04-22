import {appReducer, initializedSuccess} from "./App-reducer";
import React from "react";

const initialState = {
    initialized: false
}

it ('initialized should be true', () => {
    const newState = appReducer(initialState, initializedSuccess())
    expect(newState.initialized).toBe(true);
});