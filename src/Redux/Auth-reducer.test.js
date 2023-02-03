import React from "react";
import {authReducer, setCaptchaURL, setInitialState, setLoginError, setUserAuthData} from "./Auth-reducer";

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    status: null,
    loginError: {
        resultCode: null,
        message: null
    },
    captchaURL: null,
}

it ('user auth data should be added', () => {
    const userId = 123
    const email = 'test@email.com'
    const login = 'logintest'
    const newState = authReducer(initialState, setUserAuthData(userId, email, login))
    expect(newState.userId).toBe(userId);
    expect(newState.email).toBe(email);
    expect(newState.login).toBe(login);
});

it ('initial state shold be installed', () => {
    const userId = 123
    const email = 'test@email.com'
    const login = 'logintest'
    let newState = authReducer(initialState, setUserAuthData(userId, email, login))
    newState = authReducer(newState, setInitialState(initialState))
    expect(newState.userId).toBe(null);
    expect(newState.email).toBe(null);
    expect(newState.login).toBe(null);
});

it ('login error should be added', () => {
    const resultCode = 123
    const errorMessage = 'errorMessageTest'
    let newState = authReducer(initialState, setLoginError(resultCode, errorMessage))
    expect(newState.loginError.resultCode).toBe(resultCode);
    expect(newState.loginError.message).toBe(errorMessage);
});

it ('captcha url should be added', () => {
    const url = 'https://captcha.com'
    let newState = authReducer(initialState, setCaptchaURL(url))
    expect(newState.captchaURL).toBe(url);
});
