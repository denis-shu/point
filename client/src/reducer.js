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
            };
            case "CREATE_DRAFT":
            return {
                ...state,
                draft: {
                    latitude: 0,
                    longitude: 0
                }
            };
            case "UPDATE_DRAFT_LOCATION":
            return {
                ...state,
                draft: payload
            } 
            case "SIGNOUT_USER":
            return {
                ...state,
                isAuth: false,
                currentUser: null
            };
        default:
            return state;
    }
}