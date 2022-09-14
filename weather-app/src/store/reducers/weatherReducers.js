import { GET_WEATHER_INFO, SET_ERROR } from "../type";

const initialState = {
    data: {},
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_WEATHER_INFO:
            return {
                data: action.payload,
                error: '',
            };
        case SET_ERROR:
            return {
                //DP - try to do the same above
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};