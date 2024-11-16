const initialState = {
    role: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_ROLE':
            return {
                ...state,
                role: action.payload,
            };
        default:
            return state;
    }
};
