const LOOP_PRESSED = 'LOOP_PRESSED';
const SHUFFLE_PRESSED = 'SHUFFLE_PRESSED'

function shufflePressed() {
    return {
        type: SHUFFLE_PRESSED
    }
}

function loopPressed() {
    return {
        type: LOOP_PRESSED
    }
}

export function shufflePress() {
    return async dispatch => {
        try {
            dispatch(shufflePressed())
        } catch (err) {
            console.error(err)
        }
    }
}

export function loopPress() {
    return async dispatch => {
        try {
            dispatch(loopPressed())
        } catch (err) {
            console.error(err)
        }
    }
}

const buttonsState = {
    loopPressed: false,
    shufflePressed: false
}

const buttonsReducer = (state = buttonsState, action) => {
    switch (action.type) {
        case LOOP_PRESSED:
            return { ...state, loopPressed: !state.loopPressed }
        case SHUFFLE_PRESSED:
            return { ...state, shufflePressed: !state.shufflePressed }
        default:
            return state
    }
}

export default buttonsReducer;