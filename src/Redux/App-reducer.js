import {getAuthData} from "./Auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

const initialState = {
    initialized: false
}


export const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthData())
    // promise.then((res) => {
    //     console.log(res)
    //     dispatch(initializedSuccess())
    // })
    Promise.all([promise]).then(() => {
        // debugger
        dispatch(initializedSuccess())
    })

}