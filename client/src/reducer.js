export default function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}