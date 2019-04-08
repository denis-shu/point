export default function reducer(state, {type, payload}) {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                currentUser: payload
            };
            case "IS_LOGGED_IN":
            return {
                ...state,
                isAuth: payload
            }
        default:
            return state;
    }
}