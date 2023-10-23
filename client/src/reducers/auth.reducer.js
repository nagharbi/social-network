import inMemory from '../components/Auth/InMemory';
import { AUTH, LOGOUT, REGISTER_USER } from '../constants/actionTypes';

const authReducer = (state = { authData: null, isRegistred: false }, action) => {
    switch (action.type) {
        case AUTH:
            const { user, token } = { ...action?.payload };
            inMemory.setToken(token);
            inMemory.setProfile(user);
            return { ...state, authData: action?.data };
        case REGISTER_USER:
            inMemory.removeSession();
            inMemory.removeSession();
            return { ...state, authData: null, isRegistred: action?.payload };
        case LOGOUT:
            inMemory.removeSession();
            inMemory.removeSession();
            return { ...state, authData: null};
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state;
    }
};

export default authReducer;
